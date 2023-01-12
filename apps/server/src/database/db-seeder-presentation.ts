import { DataSource } from 'typeorm';
import moment from 'moment';
import { INestApplication } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { Chunk } from '../tasks/chunks/chunk.entity';
import { ConstTaskInput } from '../tasks/dto/constTask.input';
import { Repeat, RepeatType } from '../tasks/entities/repeat.entity';
import { Task } from '../tasks/entities/task.entity';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/entities/user.entity';
import newDate from '../utils/newDate';
import { TaskPlanner } from '../workers/taskPlanner';
import { InitialSeed } from './initial-seed';

// TODO This needs to be changed to adapt new functionality

export const seedDatabasePresentation = async (app: INestApplication) => {
  const taskPlanner = app.get(TaskPlanner);

  const createConstTask = async (params: {
    taskName: string;
    category: Category;
    start: Date;
    user: User;
    priority?: string;
    duration?: moment.Duration;
    repeat?: Repeat;
  }) => {
    // Get taskService
    const taskService: TasksService = app.get(TasksService);

    const createConstTaskInput: ConstTaskInput = {
      name: params.taskName,
      category: params.category,
      start: params.start,
      priority: params.priority || 'medium',
      // duration defaults to 1.5 hours
      duration: params.duration || moment.duration(1.5, 'hours'),
      repeat: params.repeat || {
        repeatType: RepeatType.WEEKS,
        repeatEvery: 1,
      },
      shouldAutoResolve: false,
      timeBeforeNotification: moment.duration(15, 'minutes'),
      // TODO Change that to normal value
      chillTime: moment.duration(15, 'minutes'),
      // TODO is it needed here?
      isDone: false,
    };

    await taskService.createConst(params.user, createConstTaskInput);
  };

  const entities = app.get(DataSource).entityMetadatas;
  for (const entity of entities) {
    const repository = app.get(DataSource).getRepository(entity.name);
    await repository.query(
      `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
    );
  }

  // Add user
  const user = await User.create({
    email: InitialSeed.email,
    introductionCompleted: true,
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

  // TODO Handle this unused categories
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

  const preparationCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[3] } }),
    name: 'Study Preparation',
    user: user,
  }).save();

  const workCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[5] } }),
    name: 'Work',
    user: user,
  }).save();

  const hobbyCategory = await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[4] } }),
    name: 'Hobby',
    user: user,
  }).save();

  const everyDayRepeat = await Repeat.create({
    repeatType: RepeatType.DAYS,
    repeatEvery: 1,
  }).save();

  const everyDayRepeat1 = await Repeat.create({
    repeatType: RepeatType.DAYS,
    repeatEvery: 1,
  }).save();

  const everyDayRepeat2 = await Repeat.create({
    repeatType: RepeatType.DAYS,
    repeatEvery: 1,
  }).save();

  const everyDayRepeat3 = await Repeat.create({
    repeatType: RepeatType.DAYS,
    repeatEvery: 1,
  }).save();

  const everyDayRepeat4 = await Repeat.create({
    repeatType: RepeatType.DAYS,
    repeatEvery: 1,
  }).save();

  const everySecondDayRepeat = await Repeat.create({
    repeatType: RepeatType.DAYS,
    repeatEvery: 2,
  }).save();

  const everySecondDayRepeat1 = await Repeat.create({
    repeatType: RepeatType.DAYS,
    repeatEvery: 2,
  }).save();

  //   Sleep
  await createConstTask({
    taskName: 'Sleep',
    category: sleepingCategory,
    // New date in utc
    start: newDate(2023, 1, 12, 23),
    duration: moment.duration(8, 'hours'),
    user: user,
    priority: 'medium',
    repeat: everyDayRepeat,
  });

  await createConstTask({
    taskName: 'Prepare for sleep',
    category: hobbyCategory,
    // New date in utc
    start: newDate(2023, 1, 13, 22, 30),
    duration: moment.duration(15, 'minutes'),
    user: user,
    priority: 'low',
    repeat: everyDayRepeat1,
  });

  // Breakfast
  await createConstTask({
    taskName: 'Breakfast',
    category: eatingCategory,
    // New date in utc
    start: newDate(2023, 1, 13, 7, 15),
    duration: moment.duration(30, 'minutes'),
    user: user,
    priority: 'medium',
    repeat: everyDayRepeat2,
  });

  // Work
  await createConstTask({
    taskName: 'Work',
    category: workCategory,
    // New date in utc
    start: newDate(2023, 1, 13, 8, 0),
    duration: moment.duration(8, 'hours'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Work',
    category: workCategory,
    // New date in utc
    start: newDate(2023, 1, 16, 8, 0),
    duration: moment.duration(8, 'hours'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Work',
    category: workCategory,
    // New date in utc
    start: newDate(2023, 1, 17, 8, 0),
    duration: moment.duration(8, 'hours'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Work',
    category: workCategory,
    // New date in utc
    start: newDate(2023, 1, 18, 8, 0),
    duration: moment.duration(8, 'hours'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Work',
    category: workCategory,
    // New date in utc
    start: newDate(2023, 1, 19, 8, 0),
    duration: moment.duration(8, 'hours'),
    user: user,
    priority: 'high',
  });

  // Supper
  await createConstTask({
    taskName: 'Supper',
    category: eatingCategory,
    // New date in utc
    start: newDate(2023, 1, 13, 16, 15),
    duration: moment.duration(1, 'hours'),
    user: user,
    priority: 'low',
    repeat: everyDayRepeat3,
  });

  await createConstTask({
    taskName: 'Snack',
    category: eatingCategory,
    // New date in utc
    start: newDate(2023, 1, 13, 20, 0),
    duration: moment.duration(15, 'minutes'),
    user: user,
    priority: 'low',
    repeat: everyDayRepeat4,
  });

  // Gym
  await createConstTask({
    taskName: 'Go to the gym',
    category: sportCategory,
    // New date in utc
    start: newDate(2023, 1, 13, 17, 30),
    duration: moment.duration(135, 'minutes'),
    user: user,
    priority: 'medium',
    repeat: everySecondDayRepeat,
  });

  await createConstTask({
    taskName: 'Play the guitar',
    category: hobbyCategory,
    // New date in utc
    start: newDate(2023, 1, 14, 17, 30),
    duration: moment.duration(75, 'minutes'),
    user: user,
    priority: 'medium',
    repeat: everySecondDayRepeat1,
  });

  await createConstTask({
    taskName: 'Swimming Pool',
    category: sportCategory,
    // New date in utc
    start: newDate(2023, 1, 14, 8, 0),
    duration: moment.duration(135, 'minutes'),
    user: user,
    priority: 'medium',
  });

  await createConstTask({
    taskName: 'Swimming Pool',
    category: sportCategory,
    // New date in utc
    start: newDate(2023, 1, 15, 8, 0),
    duration: moment.duration(135, 'minutes'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Dinner',
    category: eatingCategory,
    // New date in utc
    start: newDate(2023, 1, 14, 13, 0),
    duration: moment.duration(45, 'minutes'),
    user: user,
    priority: 'medium',
  });

  await createConstTask({
    taskName: 'Laundry',
    category: workCategory,
    // New date in utc
    start: newDate(2023, 1, 14, 14, 0),
    duration: moment.duration(105, 'minutes'),
    user: user,
    priority: 'medium',
  });

  await createConstTask({
    taskName: 'Dinner',
    category: eatingCategory,
    // New date in utc
    start: newDate(2023, 1, 15, 13, 0),
    duration: moment.duration(45, 'minutes'),
    user: user,
    priority: 'medium',
  });

  await createConstTask({
    taskName: 'Cleaning the room',
    category: workCategory,
    // New date in utc
    start: newDate(2023, 1, 15, 14, 0),
    duration: moment.duration(105, 'minutes'),
    user: user,
    priority: 'medium',
  });

  const prepareForEngineerExam = await Task.create({
    name: 'Prepare for Engineer Exam',
    category: preparationCategory,
    priority: 'high',
    isFloat: true,
    user: user,
    chunkInfo: {
      start: newDate(2023, 1, 13, 7, 15),
      minChunkDuration: moment.duration(30, 'minutes'),
      maxChunkDuration: moment.duration(2, 'hour'),
      estimation: moment.duration(15, 'hours'),
      deadline: newDate(2023, 1, 20, 0, 0),
      chillTime: moment.duration(30, 'minutes'),
    },
  }).save();

  // plan task

  await taskPlanner.planTask(prepareForEngineerExam);
};
