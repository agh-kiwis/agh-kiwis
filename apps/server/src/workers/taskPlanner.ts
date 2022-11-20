import { createQueryBuilder } from 'typeorm';
import moment, { Duration, duration } from 'moment';
import { Logger } from '@nestjs/common';
import { Chunk } from '../tasks/entities/chunk.entity';
import { Task } from '../tasks/entities/task.entity';

const WEEKS_TO_ADD = 4;

type Window = {
  start: moment.Moment;
  duration: moment.Duration;
};

export const planTask = async (task: Task) => {
  if (!task || !task.isFloat) {
    throw new Error('No task to plan or task is not a float task.');
  }

  Logger.log(`Started task planner for : ${task.id}`);

  // Get current user or raise error
  const user = task.user;
  if (!user) {
    // This case should not be possible as user is required in the task
    throw new Error('No user found for task.');
  }

  // Check that start date is in the future
  if (task.chunkInfo.start && moment(task.chunkInfo.start).isBefore(moment())) {
    throw new Error(
      'Start date is in the past, but needs to be in the future.'
    );
  }

  // We need to create a transaction for the sake of integrity of operations
  const queryRunner = createQueryBuilder().connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  // Get all float tasks breakdowns for the user in the given range

  let endDate: Date;

  // TODO Think of this endDate more later on
  if (task.chunkInfo.deadline) {
    endDate = task.chunkInfo.deadline;
  } else {
    endDate = moment(task.chunkInfo.start)
      .clone()
      .add(WEEKS_TO_ADD, 'weeks')
      .toDate();
  }

  // Get float tasks for which one of the breakdowns is in the given range

  // console.log(task.chunkInfo.start);
  // console.log({ endDate });

  let allTasks = await queryRunner.manager
    .createQueryBuilder(Task, 'task')
    .innerJoinAndSelect('task.chunks', 'chunk')
    .where('task.userId = :userId', { userId: user.id })
    // TODO There we would need to consider duration also
    .andWhere('chunk.start BETWEEN :start AND :end', {
      start: task.chunkInfo.start,
      end: endDate,
    })
    // Get chunkInfo
    .innerJoinAndSelect('task.chunkInfo', 'chunkInfo')
    // order by start
    .orderBy('chunkInfo.start', 'ASC')
    .getMany();

  // console.log({ allTasks });

  // TODO This is not working, but should work and I've no idea why?
  // For now it's not bothering us too much
  const notPlannedFloats = await queryRunner.manager
    .createQueryBuilder(Task, 'task')
    .innerJoinAndSelect('task.chunkInfo', 'chunkInfo')
    .where('task.userId = :userId', { userId: user.id })
    .andWhere('task.isFloat = :isFloat', { isFloat: true })
    // TODO There we would need to consider duration also
    .andWhere('chunkInfo.start BETWEEN :start AND :end', {
      start: task.chunkInfo.start,
      end: endDate,
    })
    // Without chunks
    .innerJoin('task.chunks', 'chunk')
    .andWhere('chunk.id IS NULL')
    // Get chunkInfo
    .getMany();

  // console.log({ notPlannedFloats });

  // Merge without duplicates

  // TODO Remove this when the above query returns correct results
  allTasks.push(task);

  allTasks = [...allTasks, ...notPlannedFloats].filter(
    (task, index, self) => index === self.findIndex((t) => t.id === task.id)
  );

  // Append current task to float tasks

  // Get only float tasks from the above list
  const floatTasks = allTasks.filter((task) => task.isFloat);
  const constTasks = allTasks.filter((task) => !task.isFloat);

  // console.log({ floatTasks });
  // console.log({ constTasks });

  // Delete chunks for the given float tasks
  if (floatTasks.length > 0) {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Chunk)
      .where('taskId IN (:...ids)', { ids: floatTasks.map((t) => t.id) })
      // Where start is after task.start
      .andWhere('start >= :start', { start: task.chunkInfo.start })
      .execute();
  }

  const taskIdAndWeightMap = new Map();
  floatTasks.forEach((task) => {
    taskIdAndWeightMap.set(task.id, getTaskWeight(task));
  });

  // console.log({ taskIdAndWeightMap });

  // Sort tasks by weight
  const sortedTasks = floatTasks.sort((a, b) => {
    const { priority: priorityA } = taskIdAndWeightMap.get(a.id);
    const { priority: priorityB } = taskIdAndWeightMap.get(b.id);
    return priorityB - priorityA;
  });

  // console.log({ sortedTasks });

  sortedTasks.sort((a, b) => {
    const { deadlineA } = taskIdAndWeightMap.get(a.id);
    const { deadlineB } = taskIdAndWeightMap.get(b.id);
    return deadlineB - deadlineA;
  });

  // console.log({ sortedTasks });

  // Find all windows in moment duration between start time and end time of the const tasks.
  let endTime = moment(task.chunkInfo.start);
  let windows: Window[] | false = [];

  const constTaskChunks = constTasks.reduce((acc, task) => {
    // Add chunkInfo chillTime to each chunk
    const chunks = task.chunks.map((chunk) => ({
      ...chunk,
      chillTime: task.chunkInfo.chillTime,
    }));

    return [...acc, ...chunks];
  }, []);

  // Order chunks by start
  constTaskChunks.sort((a, b) => {
    return moment(a.start).diff(moment(b.start));
  });

  // console.log({ constTaskChunks });

  constTaskChunks.forEach((chunk) => {
    // Add duration to the first task
    // If time is not negative add to the windows
    const currentDuration = moment.duration(chunk.duration);
    const currentStart = moment(chunk.start);

    if (endTime.isBefore(currentStart)) {
      (windows as Window[]).push({
        start: endTime,
        duration: moment.duration(currentStart.diff(endTime)),
      });
    }
    endTime = currentStart
      .clone()
      .add(currentDuration.clone().add(chunk.chillTime));
  });

  // printWindows(windows);

  // Take first by importance tuple task and try to fit it in all the windows counting the coefficient. We are trying our best to fit maximum of this task in the window. If it's possible we can even fit 2 or more instances of that task into the window.

  // Fit tasks in windows and calculate coefficients

  sortedTasks.forEach((task) => {
    windows = fitTask(task, windows as Window[], endDate);
    if (!windows) {
      // HANDLE THE ERROR SOMEHOW
      throw new Error('No windows left!!! Please do something later');
    }
  });

  // Commit transaction
  await queryRunner.commitTransaction();
};

const getTaskWeight = (task: Task) => {
  const deadline = moment(task.chunkInfo.deadline).diff(
    moment(task.chunkInfo.start),
    'minutes'
  );
  const priority =
    task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : 1;

  return { deadline, priority };
};

const fitTask = (
  task: Task,
  windows: Window[],
  endDate: Date
): Window[] | false => {
  // console.log('FITTING TASK!');
  // TODO Handle the edge case below
  // We have an edge case where task starts before the current task and one of its already planned chunks is AFTER the current task start
  // In this case we only want to replan the chunks AFTER the current task start

  // 1. Take every window and try to fit as much of a task as we can into that window
  // 1b. Calculate the coefficient for the window
  // 2. Sort windows by coefficient
  // 3. Try to fit task regarding that coefficient and see if it fits.

  // 4. If yes, then occupy used windows and return the rest of the windows

  // We need to create a map with window index and coefficient
  const windowIndexAndCoefficientMap = new Map();

  // Iterate over windows and calculate coefficient for each window

  for (const [index, window] of windows.entries()) {
    // All edge cases

    if (moment(endDate).isBefore(window.start)) {
      break;
    }
    if (
      window.duration.asMinutes() <
      task.chunkInfo.minChunkDuration.asMinutes() +
        task.chunkInfo.chillTime.asMinutes()
    ) {
      break;
    }

    // Find the max duration of the task (excluding chill time) that can fit into the window

    const windowCoefficient = tryFittingTask(task, window);
    windowIndexAndCoefficientMap.set(index, windowCoefficient);
  }

  console.log({ windowIndexAndCoefficientMap });

  return windows;

  // This needs to return new windows with occupied windows taken out
  // return isFitted ? windows : false;

  // // Assuming that the whole task needs to be planned in the given windows
  // const durationToBePlanned = moment.duration(task.chunkInfo.duration);
};

const getCoefficient = (
  windowDuration: Duration,
  fittedPartDuration: Duration
) => {
  console.log(windowDuration.asMinutes());
  console.log(fittedPartDuration.asMinutes());
  return fittedPartDuration.asMinutes() / windowDuration.asMinutes();
};

const printWindows = (windows: Window[]) => {
  console.log('Windows:');
  windows.forEach((window) => {
    console.log(
      `Start: ${window.start.format('YYYY-MM-DD HH:mm')}, End: ${window.start
        .clone()
        .add(window.duration)
        .format('YYYY-MM-DD HH:mm')}`
    );
  });
};

const tryFittingTask = (task: Task, window: Window) => {
  // This assumes that we can fit SOMETHING!!

  const windowDuration: Duration | false = window.duration;

  if (window.duration.asMinutes() == 0) {
    throw new Error('Window duration is 0');
  }

  const taskDuration = moment.duration(task.chunkInfo.duration);

  while (windowDuration && taskDuration.asMinutes() > 0) {
    //  THIS CAN BE A SOURCE OF Infinite loop
    const durationUsed = getMaxChunkToFit(
      task,
      windowDuration as moment.Duration,
      taskDuration
    );

    console.log({ durationUsed });

    if (durationUsed) {
      durationUsed.add(task.chunkInfo.chillTime);
      console.log({ windowDuration });
      windowDuration.subtract(durationUsed);
      console.log({ windowDuration });
      taskDuration.subtract(durationUsed);
    } else {
      break;
    }
  }

  const durationUsed = window.duration.clone().subtract(windowDuration);

  return getCoefficient(window.duration, durationUsed);
};

const getMaxChunkToFit = (
  task: Task,
  windowDuration: Duration,
  realTaskDuration: Duration
) => {
  let maxChunkDurationWithChillTime = task.chunkInfo.maxChunkDuration
    .clone()
    .add(task.chunkInfo.chillTime);

  // const realTaskDuration = task.chunkInfo.duration;

  if (windowDuration < maxChunkDurationWithChillTime) {
    return false;
  }

  if (realTaskDuration <= task.chunkInfo.maxChunkDuration) {
    maxChunkDurationWithChillTime = realTaskDuration
      .clone()
      .add(task.chunkInfo.chillTime);
  }

  if (maxChunkDurationWithChillTime > windowDuration) {
    return windowDuration.subtract(task.chunkInfo.chillTime);
  }

  if (maxChunkDurationWithChillTime <= windowDuration) {
    return task.chunkInfo.maxChunkDuration;
  }
};
