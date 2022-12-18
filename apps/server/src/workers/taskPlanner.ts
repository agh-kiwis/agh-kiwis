import { DataSource } from 'typeorm';
import moment, { Duration } from 'moment';
import { Injectable } from '@nestjs/common';
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
        // Where chunks are not done
        .andWhere('isDone = :isDone', { isDone: false })
        .execute();
    }

    // Find all windows in moment duration between start time and end time of the const tasks.

    let taskStartTime = moment(task.chunkInfo.start);
    let windows: Window[] = [];

    // Add chillTime to each const task chunk
    const constTaskChunks = constTasks.reduce((acc, task) => {
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

    if (constTaskChunks.length > 0) {
      constTaskChunks.forEach((chunk) => {
        // Add duration to the first task
        // If time is not negative add to the windows
        const chunkStartTime = moment(chunk.start);
        const chunkDuration = moment.duration(chunk.duration);

        if (taskStartTime.isBefore(chunkStartTime)) {
          (windows as Window[]).push({
            start: taskStartTime,
            duration: moment.duration(chunkStartTime.diff(taskStartTime)),
          });
        }
        taskStartTime = chunkStartTime
          .clone()
          .add(chunkDuration.clone().add(chunk.chillTime));
      });
    } else {
      // if there are no const tasks, add the whole time to the windows
      windows.push({
        start: taskStartTime,
        duration: moment.duration(
          moment(task.chunkInfo.deadline).diff(task.chunkInfo.start)
        ),
      });
    }

    // If there is time left after the last const task, add it to the windows
    if (constTaskChunks.length > 0) {
      const lastChunk = constTaskChunks[constTaskChunks.length - 1];
      const lastChunkStart = moment(lastChunk.start);
      const lastChunkDuration = moment.duration(lastChunk.duration);
      if (
        lastChunkStart.add(lastChunkDuration).isBefore(task.chunkInfo.deadline)
      ) {
        windows.push({
          start: lastChunkStart.add(lastChunkDuration),
          duration: moment.duration(
            moment(task.chunkInfo.deadline).diff(
              lastChunkStart.add(lastChunkDuration)
            )
          ),
        });
      }
    }

    interface Weight {
      deadline: number;
      priority: number;
    }

    // 1. Find task weight
    const getTaskWeight = (task: Task) => {
      const deadline = moment(task.chunkInfo.deadline).diff(
        moment(task.chunkInfo.start),
        'minutes'
      );
      const priority =
        task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : 1;

      return { deadline, priority };
    };

    // 2. Sort all tasks by weight
    const taskIdAndWeightMap = new Map<number, Weight>();
    floatTasks.forEach((task) => {
      taskIdAndWeightMap.set(task.id, getTaskWeight(task));
    });

    const sortedTasks = floatTasks.sort((a, b) => {
      const priorityA = taskIdAndWeightMap.get(a.id).priority;
      const priorityB = taskIdAndWeightMap.get(b.id).priority;
      return priorityB - priorityA;
    });

    sortedTasks.sort((a, b) => {
      const deadlineA = taskIdAndWeightMap.get(a.id).deadline;
      const deadlineB = taskIdAndWeightMap.get(b.id).deadline;
      return deadlineA - deadlineB;
    });

    // Fit tasks in windows and calculate coefficients
    const chunksToInsert = [];

    sortedTasks.forEach((task) => {
      windows = fitTask(task, windows, task.chunkInfo.deadline, chunksToInsert);
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

const calculateCoefficient = (
  task: Task,
  taskDuration: Duration,
  window: Window
) => {
  const windowDuration: Duration = window.duration.clone();

  if (window.duration.asMinutes() == 0) {
    throw new Error('Window duration is 0');
  }
  while (windowDuration.asMinutes() > 0 && taskDuration.asMinutes() > 0) {
    const chunkSize = getMaxChunkToFit(task, windowDuration, taskDuration);

    if (chunkSize && chunkSize.asMinutes() > 0) {
      // We were able to create a non-zero chunk
      taskDuration = taskDuration.clone().subtract(chunkSize);
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
  estimation: Duration
) => {
  const minCTWithChill = task.chunkInfo.minChunkDuration
    .clone()
    .add(task.chunkInfo.chillTime);

  const maxCTWithChill = task.chunkInfo.maxChunkDuration
    .clone()
    .add(task.chunkInfo.chillTime);

  const estimationWithChill = estimation.clone().add(task.chunkInfo.chillTime);

  if (estimation >= task.chunkInfo.maxChunkDuration) {
    if (maxCTWithChill <= windowDuration) {
      return task.chunkInfo.maxChunkDuration.clone();
    } else if (windowDuration >= minCTWithChill) {
      return windowDuration.clone().subtract(task.chunkInfo.chillTime);
    } else return;
  } else if (estimationWithChill <= windowDuration) {
    return estimation;
  } else return;
};

// Utils

const getCoefficient = (
  windowDuration: Duration,
  fittedPartDuration: Duration
) => {
  return fittedPartDuration.asMinutes() / windowDuration.asMinutes();
};

const findBestWindow = (
  task: Task,
  taskDuration: Duration,
  windows: Window[],
  endDate: Date
) => {
  const windowsAndCoefficientMap = new Map();
  if (windows.length === 0) {
    throw new Error('No windows found!');
  }
  windows.forEach((window) => {
    if (moment(endDate).isAfter(window.start)) {
      windowsAndCoefficientMap.set(
        window,
        calculateCoefficient(task, taskDuration.clone(), window)
      );
    }
  });

  const bestWindow = Array.from(windowsAndCoefficientMap.entries()).reduce(
    (a, b) => (a[1] < b[1] ? b : a)
  )[0];
  return bestWindow;
};

const processWindows = (windows: Window[]) => {
  const windowsIndexesToRemove = [];
  const windowsToAppend: Window[] = [];

  for (const [index, window] of windows.entries()) {
    if (!window.usedDuration) {
      continue;
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

const fitTask = (
  task: Task,
  windows: Window[],
  endDate: Date,
  chunksToInsert: Chunk[]
): Window[] => {
  const taskEstimation = moment.duration(task.chunkInfo.estimation).clone();

  const window = findBestWindow(task, taskEstimation, windows, endDate);
  if (!window) {
    return;
  }

  let taskDuration = getDurationUsedForTheWindow(
    task,
    window,
    taskEstimation,
    chunksToInsert
  );

  windows = processWindows(windows);

  while (taskDuration.asMinutes() > 0) {
    const window = findBestWindow(task, taskDuration, windows, endDate);
    taskDuration = getDurationUsedForTheWindow(
      task,
      window,
      taskDuration,
      chunksToInsert
    );
    windows = processWindows(windows);
  }
  printWindows(windows);
  return windows;
};
// Iterate over windows and check if used duration is equal to duration then remove the window, else split into two windows

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
      taskDuration = taskDuration.clone().subtract(chunkSize);
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
    } else {
      break;
    }
  }
  return taskDuration;
};
