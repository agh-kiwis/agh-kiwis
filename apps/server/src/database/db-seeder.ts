import moment = require('moment');
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { ChunkInfo } from '../tasks/entities/chunkInfo.entity';
import { Notification } from '../tasks/entities/notification.entity';
import { Priority } from '../tasks/entities/priority.entity';
import { Repeat, RepeatType } from '../tasks/entities/repeat.entity';
import { Task } from '../tasks/entities/task.entity';
import { TaskBreakdown } from '../tasks/entities/taskBreakdown.entity';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/entities/user.entity';
import { InitialSeend } from './initial-seed';

export const seedDatabase = async () => {
  // TODO This is ugly and needs to be replaced with db deletion & creation
  // TODO And overall we would like to use migrations
  await TaskBreakdown.delete({});
  await Repeat.delete({});
  await Task.delete({});
  await Category.delete({});
  await Priority.delete({});
  await Color.delete({});
  await ChunkInfo.delete({});
  await Notification.delete({});
  await User.delete({});

  // Add user
  const user = await User.create({
    email: InitialSeend.email,
    password: InitialSeend.password,
  }).save();

  // Add colors to database
  for (const color of InitialSeend.colors) {
    await Color.create({
      hexCode: color,
    }).save();
  }

  // Introduction setup

  const sleepingCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeend.colors[0] } }),
    name: 'Sleeping',
    user: user,
  }).save();

  const eatingCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeend.colors[1] } }),
    name: 'Eating',
    user: user,
  }).save();

  const sportCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeend.colors[2] } }),
    name: 'Sport',
    user: user,
  }).save();

  // Add priorities

  const lowPriority = await Priority.create({
    name: 'Low',
  }).save();

  const mediumPriority = await Priority.create({
    name: 'Low',
  }).save();
  await Priority.create({
    name: 'Low',
  }).save();

  // Add some tasks
  const ten_minutes = moment.duration({ minutes: 10 });
  const taskService = new TasksService();

  // Const tasks

  taskService.createConst(user, {
    category: { id: eatingCategory.id },
    name: 'Breakfast',
    priorityId: mediumPriority.id,
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
      startFrom: moment().startOf('day').add(1, 'day').toDate(),
      repeatEvery: 1,
      repeatType: RepeatType.DAYS,
    },
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(1, 'days').add(8, 'hours').toDate(),
    duration: moment.duration({ minutes: 20 }),
  });

  taskService.createConst(user, {
    category: { id: eatingCategory.id },
    name: 'Supper',
    priorityId: mediumPriority.id,
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
      startFrom: moment().startOf('day').add(1, 'day').toDate(),
      repeatEvery: 1,
      repeatType: RepeatType.DAYS,
    },
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(1, 'days').add(14, 'hours').toDate(),
    duration: moment.duration({ minutes: 40 }),
  });

  taskService.createConst(user, {
    category: { id: eatingCategory.id },
    name: 'Dinner',
    priorityId: mediumPriority.id,
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
      startFrom: moment().startOf('day').add(1, 'day').toDate(),
      repeatEvery: 1,
      repeatType: RepeatType.DAYS,
    },
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(18, 'hours').add(1, 'days').toDate(),
    duration: moment.duration({ minutes: 40 }),
  });

  // Float tasks:

  taskService.createFloatTask(user, {
    category: { id: eatingCategory.id },
    name: 'Get prepared for IO exam',
    priorityId: mediumPriority.id,
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
      startFrom: moment().startOf('day').add(1, 'day').toDate(),
      repeatEvery: 1,
      repeatType: RepeatType.DAYS,
    },
    timeBeforeNotification: ten_minutes,
    // Can start now
    start: moment().startOf('day').add(1, 'days').toDate(),

    estimation: moment.duration({ hour: 10 }),
    chunkInfo: {
      maxChunkDuration: moment.duration({ minutes: 20 }),
      minChunkDuration: moment.duration({ minutes: 10 }),
      minTimeBetweenChunks: moment.duration({ minutes: 10 }),
    },
    deadline: moment().startOf('day').add(3, 'days').add(12, 'hours').toDate(),
  });
};
