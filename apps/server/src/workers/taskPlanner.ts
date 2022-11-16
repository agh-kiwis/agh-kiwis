import { createQueryBuilder } from 'typeorm';
import moment from 'moment';
import { Logger } from '@nestjs/common';
import { Task } from '../tasks/entities/task.entity';
import { TaskBreakdown } from '../tasks/entities/taskBreakdown.entity';

const WEEKS_TO_ADD = 2;

export const planTask = async (task: Task) => {
  if (!task || !task.isFloat) {
    throw new Error('No task to plan or task is not a float task.');
  }

  // Get current user or raise error
  const user = await task.user;
  if (!user) {
    throw new Error('No user found for task.');
  }

  const chunkInfoToPrint = task.chunkInfo;

  // Check that start date is in the future
  if (task.chunkInfo.start && moment(task.chunkInfo.start).isBefore(moment())) {
    throw new Error('Start date is in the past.');
  }

  Logger.log(`Started task planner for : ${task.id}`);

  // We need to create a transaction for the sake of integrity of operations
  const queryRunner = createQueryBuilder().connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  // Get all float tasks breakdowns for the user in the given range

  // Add 2 weeks to the task.chunkInfo.start
  // This should be customizable
  const endDate = moment(task.chunkInfo.start)
    .add(WEEKS_TO_ADD, 'weeks')
    .toDate();

  // Get float tasks for which one of the breakdowns is in the given range

  const allTasks = await queryRunner.manager
    .createQueryBuilder(Task, 'task')
    .innerJoinAndSelect('task.taskBreakdowns', 'taskBreakdown')
    .where('task.userId = :userId', { userId: user.id })
    .andWhere('taskBreakdown.start BETWEEN :start AND :end', {
      start: task.chunkInfo.start,
      end: endDate,
    })
    .getMany();

  // Get only float tasks from the above list
  const floatTasks = allTasks.filter((task) => task.isFloat);
  const constTasks = allTasks.filter((task) => !task.isFloat);

  console.log({ floatTasks });

  // Delete taskBreakdowns for the given float tasks
  await queryRunner.manager
    .createQueryBuilder()
    .delete()
    .from(TaskBreakdown)
    .where('taskId IN (:...ids)', { ids: floatTasks.map((t) => t.id) })
    .execute();

  const taskIdAndWeightMap = new Map();
  floatTasks.forEach((task) => {
    taskIdAndWeightMap.set(task.id, getTaskWeight(task));
  });

  // Sort tasks by weight
  const sortedTasks = floatTasks.sort((a, b) => {
    const weightA = taskIdAndWeightMap.get(a.id);
    const weightB = taskIdAndWeightMap.get(b.id);
    return weightA - weightB;
  });

  // Algorithm continuation...



  // Commit transaction
  await queryRunner.commitTransaction();
};

const getTaskWeight = (task: Task) => {
  // TODO Implement
  return 2;
};
