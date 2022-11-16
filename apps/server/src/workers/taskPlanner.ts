import { Between, createQueryBuilder } from 'typeorm';
import moment from 'moment';
import { Logger } from '@nestjs/common';
import { ChunkInfo } from '../tasks/entities/chunkInfo.entity';
import { Task } from '../tasks/entities/task.entity';
import { TaskBreakdown } from '../tasks/entities/taskBreakdown.entity';

// There we will have CONSTS that define the app behaviour

const MAX_TASKS_PER_DAY = 10;
const MORNING_START = 8;
const MORNING_END = 24;

export const planTask = async (task: Task, chunkInfo: ChunkInfo) => {
  if (!task || !task.isFloat) {
    throw new Error('No task to plan or task is not a float task.');
  }

  // Get current user or raise error
  const user = task.user;
  if (!user) {
    throw new Error('No user found for task.');
  }

  // Check that start date is in the future
  if (task.chunkInfo.start && moment(task.chunkInfo.start).isBefore(moment())) {
    throw new Error('Start date is in the past.');
  }

  Logger.log(`Started task planner for : ${task.id}`);

  console.log("Hello there");

  // We need to create a transaction for the sake of integrity of operations
  const queryRunner = createQueryBuilder().connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  // Get all float tasks breakdowns for the user in the given range

  // Add 2 weeks to the task.chunkInfo.start
  // This should be customizable
  const endDate = moment(task.chunkInfo.start).add(2, 'weeks').toDate();

  // const floatTasks = await queryRunner.manager.find(Task, {
  //   where: {
  //     user,
  //     isFloat: true,
  //     taskBreakdowns: {
  //       start: Between(task.chunkInfo.start, endDate),
  //     },
  //   },
  // });

  await queryRunner.manager.delete(TaskBreakdown, { task: task});
  await TaskBreakdown.delete({ task: task });

  //   So we just go from start date and if we can fit task over there, than fit, else just jump over that task + gap between tasks, and repeat again.

  // Get tasks from start to deadline date
  const tasksInBetween = await createQueryBuilder<TaskBreakdown>(
    'TaskBreakdown'
  )
    .leftJoin('TaskBreakdown.task', 'task')
    .where(
      'TaskBreakdown.start >= :start and TaskBreakdown.start <= :deadline',
      {
        start: chunkInfo.start,
        deadline: chunkInfo.deadline,
      }
    )
    .andWhere('task.user = :user_id', { user_id: (await task.user).id })
    .orderBy('TaskBreakdown.start', 'ASC')
    .getMany();

  // Initialize with 0 duration
  const timeOverall = moment.duration(0);

  const taskBreakDowns: TaskBreakdown[] = [];
  // Now Check the first task, and if it is more
  const time = moment(chunkInfo.start);
  // Iterate for every 5 minutes from start to deadline
  while (time.isBefore(chunkInfo.deadline)) {
    // Check if we can fit the task here

    // IF we can't fit the task, just jump over it and continue
    if (fits(time, chunkInfo.maxChunkDuration, tasksInBetween)) {
      taskBreakDowns.push(
        TaskBreakdown.create({
          task: task,
          start: time.toDate(),
          duration: chunkInfo.maxChunkDuration,
        })
      );
      timeOverall.add(chunkInfo.maxChunkDuration);
      time.add(chunkInfo.chillTime);
    } else {
      time.add(moment.duration({ minutes: 5 }));
    }
    if (timeOverall >= chunkInfo.estimation) {
      // Fill the table with data and break
      await TaskBreakdown.save(taskBreakDowns);
      break;
    }
  }
};

export const fits = (
  time: moment.Moment,
  duration: moment.Duration,
  tasksInBetween: TaskBreakdown[]
) => {
  // Check if we can fit the task here
  for (const breakDown of tasksInBetween) {
    const breakDownEnd = moment(breakDown.start).add(breakDown.duration);
    if (
      time.isBetween(breakDown.start, breakDownEnd) ||
      time.add(duration).isBetween(breakDown.start, breakDownEnd)
    ) {
      return false;
    }
  }
  return true;
};
