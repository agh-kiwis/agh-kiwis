import { getConnection } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { RepeatType } from '../tasks/entities/repeat.entity';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/entities/user.entity';
import { InitialSeed } from './initial-seed';

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
    email: InitialSeed.email,
    password: InitialSeed.password,
  }).save();

  // Add colors to database
  for (const color of InitialSeed.colors) {
    await Color.create({
      hexCode: color,
    }).save();
  }

  // Introduction setup
  const sleepingCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[0] } }),
    name: 'Sleep',
    user: user,
  }).save();

  const eatingCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[1] } }),
    name: 'Meals',
    user: user,
  }).save();

  const sportCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[2] } }),
    name: 'Sport',
    user: user,
  }).save();

  const studiesCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[3] } }),
    name: 'Study',
    user: user,
  }).save();

  const hobbyCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[4] } }),
    name: 'Hobby',
    user: user,
  }).save();

  const otherCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[5] } }),
    name: 'Other',
    user: user,
  }).save();

  // Add some tasks
  const ten_minutes = moment.duration({ minutes: 10 });
  const taskService = new TasksService();

  // Const tasks

  taskService.createConst(user, {
    category: { id: eatingCategory.id },
    name: 'Breakfast',
    priority: 'low',
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
      repeatEvery: 1,
      repeatType: RepeatType.DAYS,
    },
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(1, 'days').add(7, 'hours').toDate(),
    duration: moment.duration({ minutes: 20 }),
  });

  // Temporary removal to show only one page
  taskService.createConst(user, {
    category: { id: eatingCategory.id },
    name: 'Dinner',
    priority: 'medium',
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
      repeatEvery: 1,
      repeatType: RepeatType.DAYS,
    },
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(1, 'days').add(14, 'hours').toDate(),
    duration: moment.duration({ minutes: 40 }),
  });

  taskService.createConst(user, {
    category: { id: eatingCategory.id },
    name: 'Supper',
    priority: 'high',
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
      repeatEvery: 1,
      repeatType: RepeatType.DAYS,
    },
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(18, 'hours').add(1, 'days').toDate(),
    duration: moment.duration({ minutes: 40 }),
  });

  // Sleeping category
  taskService.createConst(user, {
    category: { id: sleepingCategory.id },
    name: 'Sleep',
    priority: 'low',
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
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
    priority: 'high',
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    repeat: {
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
    priority: 'medium',
    shouldAutoResolve: true,
    chillTime: ten_minutes,
    timeBeforeNotification: ten_minutes,
    start: moment().startOf('day').add(3, 'days').toDate(),

    estimation: moment.duration({ hours: 2, minutes: 40 }),
    chunkInfo: {
      maxChunkDuration: moment.duration({ minutes: 40 }),
      minChunkDuration: moment.duration({ minutes: 20 }),
      minTimeBetweenChunks: moment.duration({ minutes: 10 }),
    },
    deadline: moment().startOf('day').add(8, 'days').add(12, 'hours').toDate(),
  });
};
