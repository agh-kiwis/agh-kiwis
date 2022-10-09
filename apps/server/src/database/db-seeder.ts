import { Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { Priority } from '../tasks/entities/priority.entity';
import { RepeatType } from '../tasks/entities/repeat.entity';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/entities/user.entity';
import { InitialSeend } from './initial-seed';

import moment = require('moment');

// TODO This needs to be changed to adapt new functionality
export const seedDatabase = async () => {
  Logger.log('Clearing the database');

  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name);
    await repository.query(
      `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
    );
  }

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

  const studiesCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeend.colors[3] } }),
    name: 'Study',
    user: user,
  }).save();

  // Add priorities

  const lowPriority = await Priority.create({
    name: 'Low',
  }).save();

  const mediumPriority = await Priority.create({
    name: 'Medium',
  }).save();

  const highPriority = await Priority.create({
    name: 'High',
  }).save();

  // Add some tasks
  const ten_minutes = moment.duration({ minutes: 10 });
  const taskService = new TasksService();

  // Const tasks

  taskService.createConst(user, {
    category: { id: eatingCategory.id },
    name: 'Breakfast',
    priorityId: lowPriority.id,
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

  // Temporary removal to show only one page
  // taskService.createConst(user, {
  //   category: { id: eatingCategory.id },
  //   name: 'Supper',
  //   priorityId: mediumPriority.id,
  //   shouldAutoResolve: true,
  //   chillTime: ten_minutes,
  //   repeat: {
  //     startFrom: moment().startOf('day').add(1, 'day').toDate(),
  //     repeatEvery: 1,
  //     repeatType: RepeatType.DAYS,
  //   },
  //   timeBeforeNotification: ten_minutes,
  //   start: moment().startOf('day').add(1, 'days').add(14, 'hours').toDate(),
  //   duration: moment.duration({ minutes: 40 }),
  // });

  // taskService.createConst(user, {
  //   category: { id: eatingCategory.id },
  //   name: 'Dinner',
  //   priorityId: highPriority.id,
  //   shouldAutoResolve: true,
  //   chillTime: ten_minutes,
  //   repeat: {
  //     startFrom: moment().startOf('day').add(1, 'day').toDate(),
  //     repeatEvery: 1,
  //     repeatType: RepeatType.DAYS,
  //   },
  //   timeBeforeNotification: ten_minutes,
  //   start: moment().startOf('day').add(18, 'hours').add(1, 'days').toDate(),
  //   duration: moment.duration({ minutes: 40 }),
  // });

  // Sleeping category
  taskService.createConst(user, {
    category: { id: sleepingCategory.id },
    name: 'Sleep',
    priorityId: lowPriority.id,
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
      startFrom: moment().startOf('day').add(1, 'day').toDate(),
      repeatEvery: 1,
      repeatType: RepeatType.DAYS,
    },
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(1, 'days').add(22, 'hours').toDate(),
    duration: moment.duration({ hours: 8 }),
  });

  // Sport category task

  taskService.createConst(user, {
    category: { id: sportCategory.id },
    name: 'Go to the gym',
    priorityId: highPriority.id,
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
      startFrom: moment().startOf('day').add(1, 'day').toDate(),
      repeatEvery: 1,
      repeatType: RepeatType.DAYS,
    },
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(6, 'hours').add(1, 'days').toDate(),
    duration: moment.duration({ minutes: 40 }),
  });

  // Float tasks:
  taskService.createFloatTask(user, {
    category: { id: studiesCategory.id },
    name: 'Get prepared for IO exam',
    priorityId: mediumPriority.id,
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(8, 'days').toDate(),

    estimation: moment.duration({ minutes: 40 }),
    chunkInfo: {
      maxChunkDuration: moment.duration({ minutes: 20 }),
      minChunkDuration: moment.duration({ minutes: 10 }),
      minTimeBetweenChunks: moment.duration({ minutes: 10 }),
    },
    deadline: moment().startOf('day').add(3, 'days').add(12, 'hours').toDate(),
  });
};
