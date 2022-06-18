import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { ChunkInfo } from '../tasks/entities/chunkInfo.entity';
import { Priority } from '../tasks/entities/priority.entity';
import { Repeat } from '../tasks/entities/repeat.entity';
import { Task } from '../tasks/entities/task.entity';
import { TaskBreakdown } from '../tasks/entities/taskBreakdown.entity';
import { User } from '../users/entities/user.entity';
import { InitialSeend } from './initial-seed';
import { Notification } from '../tasks/entities/notification.entity';

import * as moment from 'moment';
import * as parse from 'postgres-interval';

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

  await Priority.create({
    name: 'Low',
  }).save();
  await Priority.create({
    name: 'Low',
  }).save();

  // Add some tasks
  const ten_minutes = moment.duration('P3Y6M4DT12H30M5S');
  console.log(ten_minutes);

  // TODO This is not working yet
  const postgresTime = parse('10:00:00');
  console.log(postgresTime);

  const notifications = await Notification.create({
    timeBefore: postgresTime,
  }).save();

  await Task.create({
    user: user,
    category: sleepingCategory,
    isFloat: false,
    name: 'Sleep',
    notifications: notifications,
    priority: lowPriority,
    shouldAutoResolve: false,
    chillTime: postgresTime,
  }).save();
};
