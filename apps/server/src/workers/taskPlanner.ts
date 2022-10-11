import { createQueryBuilder } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ChunkInfo } from '../tasks/entities/chunkInfo.entity';
import { Task } from '../tasks/entities/task.entity';
import { TaskBreakdown } from '../tasks/entities/taskBreakdown.entity';

import moment = require('moment');

export const planTask = async (task: Task, chunkInfo: ChunkInfo) => {
  if (!task || !task.isFloat) {
    throw new Error('Error while planning task');
  }

  Logger.log(`Planning task: ${task.name}`);

  //   Remove all previous task breakdowns
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
        deadline: task.deadline,
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
  while (time.isBefore(task.deadline)) {
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
      time.add(chunkInfo.minTimeBetweenChunks);
    } else {
      time.add(moment.duration({ minutes: 5 }));
    }
    if (timeOverall >= task.estimation) {
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
