import { DataSource } from 'typeorm';
import moment, { Duration } from 'moment';
import { Injectable, Logger } from '@nestjs/common';
import { Chunk } from '../tasks/entities/chunk.entity';
import { Task } from '../tasks/entities/task.entity';

const WEEKS_TO_ADD = 4;

type Window = {
  start: moment.Moment;
  duration: moment.Duration;
  usedDuration?: moment.Duration;
};

@Injectable()
export class TaskPlanner {
  constructor(private dataSource: DataSource) {}

  async planTask(task: Task) {
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
    if (
      task.chunkInfo.start &&
      moment(task.chunkInfo.start).isBefore(moment())
    ) {
      console.log('task.chunkInfo.start', task.chunkInfo.start);
      throw new Error(
        'Start date is in the past, but needs to be in the future.'
      );
    }

    // We need to create a transaction for the sake of integrity of operations
    const queryRunner = this.dataSource.createQueryRunner();
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

    // TODO This is not working, but should work and I've no idea why
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

    // Merge without duplicates

    // TODO Remove this when the above query returns correct results
    allTasks.push(task);

    allTasks = [...allTasks, ...notPlannedFloats].filter(
      (task, index, self) => index === self.findIndex((t) => t.id === task.id)
    );

    // Get only float tasks from the above list
    const floatTasks = allTasks.filter((task) => task.isFloat);
    const constTasks = allTasks.filter((task) => !task.isFloat);

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

    // TODO Think of a better way to stable sort those
    // Sort tasks by weight
    const sortedTasks = floatTasks.sort((a, b) => {
      const { priority: priorityA } = taskIdAndWeightMap.get(a.id);
      const { priority: priorityB } = taskIdAndWeightMap.get(b.id);
      return priorityB - priorityA;
    });

    // sort tasks by deadline
    sortedTasks.sort((a, b) => {
      const { deadlineA } = taskIdAndWeightMap.get(a.id);
      const { deadlineB } = taskIdAndWeightMap.get(b.id);
      return deadlineB - deadlineA;
    });

    // Find all windows in moment duration between start time and end time of the const tasks.
    let endTime = moment(task.chunkInfo.start);
    let windows: Window[] = [];

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

    printWindows(windows);

    // Fit tasks in windows and calculate coefficients
    const chunksToInsert = [];

    sortedTasks.forEach((task) => {
      windows = fitTask(task, windows, endDate, chunksToInsert);
      if (!windows) {
        // This indicates that we have more tasks to plan than windows
        throw new Error('No windows left!!! Please do something later');
      }
    });

    // Commit transaction
    // Insert chunks
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Chunk)
      .values(chunksToInsert)
      .execute();

    await queryRunner.commitTransaction();
  }
}

const getTaskWeight = (task: Task) => {
  const deadline = moment(task.chunkInfo.deadline).diff(
    moment(task.chunkInfo.start),
    'minutes'
  );
  const priority =
    task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : 1;

  return { deadline, priority };
};

const tryFittingTask = (task: Task, window: Window) => {
  // This assumes that we can fit SOMETHING!!

  const windowDuration: Duration = window.duration.clone();

  if (window.duration.asMinutes() == 0) {
    throw new Error('Window duration is 0');
  }
  // This field is really tricky
  const taskDuration = moment.duration(task.chunkInfo.estimation);

  while (windowDuration.asMinutes() > 0 && taskDuration.asMinutes() > 0) {
    // This returns the max chunk we are able to fit right now
    const chunkSize = getMaxChunkToFit(
      task,
      windowDuration as moment.Duration,
      taskDuration
    );

    if (chunkSize && chunkSize.asMinutes() > 0) {
      // We were able to create a non-zero chunk
      taskDuration.subtract(chunkSize);
      chunkSize.add(task.chunkInfo.chillTime);
      windowDuration.subtract(chunkSize);
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
  // The duration that left for that window duration
  realTaskDuration: Duration
) => {
  // Throw off all possibilities where we can't no more fit a task:

  if (windowDuration.asMinutes() <= 0 || realTaskDuration.asMinutes() <= 0) {
    return;
  }

  const minChunkDurationWithChillTime = task.chunkInfo.minChunkDuration
    .clone()
    .add(task.chunkInfo.chillTime);

  if (windowDuration < minChunkDurationWithChillTime) {
    return;
  }

  const maxDurationWithChill = task.chunkInfo.maxChunkDuration
    .clone()
    .add(task.chunkInfo.chillTime);

  if (
    maxDurationWithChill >= windowDuration &&
    realTaskDuration >= maxDurationWithChill
  ) {
    return windowDuration.clone().subtract(task.chunkInfo.chillTime);
  }

  // We are dealing with a case where window is bigger then a task with chillTime, so we need to

  return task.chunkInfo.maxChunkDuration.clone();
};

// Utils

const getCoefficient = (
  windowDuration: Duration,
  fittedPartDuration: Duration
) => {
  return fittedPartDuration.asMinutes() / windowDuration.asMinutes();
};

// This function is responsible for inserting chunks for the given task (in transaction)
// And updating windows (deleting all used and shortening half-used windows)
const fitTask = (
  task: Task,
  windows: Window[],
  endDate: Date,
  chunksToInsert: Chunk[]
): Window[] => {
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
    // All edge cases handling is happening there

    if (moment(endDate).isBefore(window.start)) {
      continue;
    }
    if (
      window.duration.asMinutes() <
      task.chunkInfo.minChunkDuration.asMinutes() +
        task.chunkInfo.chillTime.asMinutes()
    ) {
      continue;
    }

    // Find the max duration of the task (excluding chill time) that can fit into the window
    const windowCoefficient = tryFittingTask(task, window);

    windowIndexAndCoefficientMap.set(index, windowCoefficient);
  }

  // Try to fit task regarding that coefficient and see if it fits.

  const taskEstimation = moment.duration(task.chunkInfo.estimation);
  let windowTaken = 0;
  const window = windows[windowTaken];
  if (!window) {
    return;
  }
  let taskDuration = getDurationUsedForTheWindow(
    task,
    window,
    taskEstimation,
    chunksToInsert
  );
  // We need to intelligently fit the task into the window

  while (taskDuration.asMinutes() > 0) {
    windowTaken++;
    const window = windows[windowTaken];

    taskDuration = getDurationUsedForTheWindow(
      task,
      window,
      taskDuration,
      chunksToInsert
    );
  }
  // Iterate over windows and check if used duration is equal to duration then remove the window, else split into two windows
  const windowsIndexesToRemove = [];
  const windowsToAppend: Window[] = [];

  for (const [index, window] of windows.entries()) {
    if (!window.usedDuration) {
      break;
    }
    if (window.usedDuration.asMinutes() > 0) {
      windowsIndexesToRemove.push(index);
    }

    // window.usedDuration is calculated with according to chillTime
    if (window.usedDuration >= window.duration) {
      continue;
    }

    // We haven't used the whole duration so we need to append a new window
    const newWindowStart = moment(window.start).add(window.usedDuration);

    const newWindowDuration = window.duration
      .clone()
      .subtract(window.usedDuration);

    windowsToAppend.push({
      start: newWindowStart,
      duration: newWindowDuration,
    });
  }

  // Remove from windows windows to remove
  const windowsToReturn = windows.filter(
    (window, index) => !windowsIndexesToRemove.includes(index)
  );

  // Append new windows to windows to return
  windowsToReturn.push(...windowsToAppend);

  // Sort windows by start date
  windowsToReturn.sort((a, b) => a.start.valueOf() - b.start.valueOf());

  // Insert chunks into the database

  return windowsToReturn;
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

const getDurationUsedForTheWindow = (
  task: Task,
  window: Window,
  taskDuration: Duration,
  chunksToInsert: Chunk[] = []
) => {
  const windowDuration: Duration = window.duration.clone();

  const windowStart = window.start.clone();

  if (window.duration.asMinutes() == 0) {
    throw new Error('Window duration is 0');
  }

  while (windowDuration.asMinutes() > 0 && taskDuration.asMinutes() > 0) {
    // This returns the max chunk we are able to fit right now
    const chunkSize = getMaxChunkToFit(task, windowDuration, taskDuration);

    if (chunkSize && chunkSize.asMinutes() > 0) {
      // We were able to create a non-zero chunk
      taskDuration.subtract(chunkSize);
      chunkSize.add(task.chunkInfo.chillTime);
      windowDuration.subtract(chunkSize);
      if (window.usedDuration) {
        window.usedDuration.add(chunkSize);
      } else {
        window.usedDuration = chunkSize;
      }
      const chunkToInsert = Chunk.create({
        task: task,
        start: windowStart.toDate(),
        duration: chunkSize.clone().subtract(task.chunkInfo.chillTime),
      });
      chunksToInsert.push(chunkToInsert);
      windowStart.add(chunkSize);
      windowStart.add(task.chunkInfo.chillTime);
    } else {
      break;
    }
  }

  return taskDuration;
};
