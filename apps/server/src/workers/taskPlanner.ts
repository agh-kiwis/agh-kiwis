import { createQueryBuilder } from 'typeorm';
import moment from 'moment';
import { Logger } from '@nestjs/common';
import { Chunk } from '../tasks/entities/chunk.entity';
import { Task } from '../tasks/entities/task.entity';

const WEEKS_TO_ADD = 2;

export const planTask = async (task: Task) => {
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

  console.log(task.chunkInfo.start);
  console.log({ endDate });

  let allTasks = await queryRunner.manager
    .createQueryBuilder(Task, 'task')
    .innerJoin('task.chunks', 'chunk')
    .where('task.userId = :userId', { userId: user.id })
    // TODO There we would need to consider duration also
    .andWhere('chunk.start BETWEEN :start AND :end', {
      start: task.chunkInfo.start,
      end: endDate,
    })
    // Get chunkInfo
    .innerJoinAndSelect('task.chunkInfo', 'chunkInfo')
    .getMany();

  console.log({ allTasks });

  // TODO This is not working, but should work and I've no idea why?
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

  console.log({ notPlannedFloats });

  // Merge without duplicates
  allTasks.push(task);

  allTasks = [...allTasks, ...notPlannedFloats].filter(
    (task, index, self) => index === self.findIndex((t) => t.id === task.id)
  );

  // Append current task to float tasks

  // Get only float tasks from the above list
  const floatTasks = allTasks.filter((task) => task.isFloat);
  const constTasks = allTasks.filter((task) => !task.isFloat);

  // This way we have an object with label as a key, like {floatTasks: [smth]}
  console.log({ floatTasks });
  console.log({ constTasks });

  // Delete chunks for the given float tasks
  if (floatTasks.length > 0) {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Chunk)
      .where('taskId IN (:...ids)', { ids: floatTasks.map((t) => t.id) })
      .execute();
  }

  const taskIdAndWeightMap = new Map();
  floatTasks.forEach((task) => {
    taskIdAndWeightMap.set(task.id, getTaskWeight(task));
  });

  console.log({ taskIdAndWeightMap });

  // Sort tasks by weight
  const sortedTasks = floatTasks.sort((a, b) => {
    const { priority: priorityA } = taskIdAndWeightMap.get(a.id);
    const { priority: priorityB } = taskIdAndWeightMap.get(b.id);
    return priorityB - priorityA;
  });

  console.log({ sortedTasks });

  sortedTasks.sort((a, b) => {
    const { deadlineA } = taskIdAndWeightMap.get(a.id);
    const { deadlineB } = taskIdAndWeightMap.get(b.id);
    return deadlineB - deadlineA;
  });

  console.log({ sortedTasks });

  // Find all windows between start time and end time of the float task we are planning.

  // Take first by importance tuple task and try to fit it in all the windows counting the coefficient. We are trying our best to fit maximum of this task in the window. If it's possible we can even fit 2 or more instances of that task into the window.

  // Iterate over tasks and:
  // Choose the first one and check it's deadline
  // Find a windows till deadline fitting the task ()

  // Commit transaction
  await queryRunner.commitTransaction();
};

const getTaskWeight = (task: Task) => {
  // TODO deadline not being real minutes between the dates

  // Convert date to minutes from the starttime
  const deadline = moment(task.chunkInfo.deadline).diff(
    moment(task.chunkInfo.start),
    'minutes'
  );

  const deadlineInt = parseInt(deadline.toString(), 10);

  console.log({ deadlineInt });

  // Convert priority to number
  // high is 3, medium is 2, low is 1
  const priority =
    task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : 1;

  return { deadline, priority };
};

const getCoefficient = (
  window: moment.Duration,
  listOfTimesTaken: moment.Duration[]
) => {
  // TODO

  // Get the sum of all the times taken
  const sumOfTimesTaken = listOfTimesTaken.reduce((acc, curr) => {
    return acc.add(curr);
  });

  // Get the difference between the window and the sum of times taken
  const difference = window.subtract(sumOfTimesTaken);

  // Get the coefficient
  const coefficient = difference.asMinutes() / window.asMinutes();

  return coefficient;
};
