import { INestApplication } from '@nestjs/common';
import moment from 'moment';
import { DataSource } from 'typeorm';
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

export const seedDatabase = async (app: INestApplication) => {
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

  const lectures_category = await Category.create({
    name: 'Lectures',
    //   Create a color green with id 1
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[4] } }),

    user: user,
  }).save();

  const labs_category = await Category.create({
    name: 'Labs',
    //   Create a color red with id 1
    color: await Color.findOne({ where: { hexCode: InitialSeed.colors[5] } }),

    user: user,
  }).save();

  const everyDayRepeat = await Repeat.create({
    repeatType: RepeatType.DAYS,
    repeatEvery: 1,
  }).save();

  // Const tasks`
  await createConstTask({
    taskName: 'Sleep',
    category: sleepingCategory,
    // New date in utc
    start: newDate(2022, 12, 11, 23),
    duration: moment.duration(8, 'hours'),
    user: user,
    priority: 'high',
    repeat: everyDayRepeat,
  });

  // LECTURES AND STUFF
  await createConstTask({
    taskName: 'Imperative Programming',
    category: lectures_category,
    start: newDate(2022, 12, 12, 11, 15),
    user,
  });

  await createConstTask({
    taskName: 'English Language',
    category: labs_category,
    start: newDate(2022, 12, 12, 14),
    user,
  });

  await createConstTask({
    taskName: 'Algorithms and Data Structures',
    category: labs_category,
    start: newDate(2022, 12, 13, 9, 35),
    user,
  });

  await createConstTask({
    taskName: 'Mathematic Analysis',
    category: lectures_category,
    start: newDate(2022, 12, 13, 11, 15),
    user,
  });

  await createConstTask({
    taskName: 'Mathematical Logic',
    category: labs_category,
    start: newDate(2022, 12, 13, 16, 15),
    user,
  });

  await createConstTask({
    taskName: 'Physics',
    category: labs_category,
    start: newDate(2022, 12, 14, 8),
    user,
  });

  await createConstTask({
    taskName: 'Mathematical Logic',
    category: lectures_category,
    start: newDate(2022, 12, 14, 11, 15),
    user,
  });

  await createConstTask({
    taskName: 'Intellectual Property',
    category: lectures_category,
    start: newDate(2022, 12, 14, 12, 50),
    user,
  });

  await createConstTask({
    taskName: 'Algorithms and Data Structures',
    category: lectures_category,
    start: newDate(2022, 12, 14, 14, 40),
    user,
  });

  await createConstTask({
    taskName: 'Mathematical Analysis',
    category: labs_category,
    start: newDate(2022, 12, 15, 14, 15),
    user,
  });

  await createConstTask({
    taskName: 'Physics',
    category: lectures_category,
    start: newDate(2022, 12, 15, 15, 45),
    user,
  });

  await createConstTask({
    taskName: 'Physical Education',
    category: labs_category,
    start: newDate(2022, 12, 16, 10, 15),
    user,
  });

  await createConstTask({
    taskName: 'Imperative Programming',
    category: labs_category,
    start: newDate(2022, 12, 16, 14, 40),
    user,
  });

  // Float tasks simulation

  const prepareForLogicExam = await Task.create({
    name: 'Prepare for Logic',
    category: preparationCategory,
    priority: 'medium',
    isFloat: true,
    user: user,
    chunkInfo: {
      start: newDate(2022, 12, 13),
      minChunkDuration: moment.duration(1, 'hour'),
      maxChunkDuration: moment.duration(3, 'hour'),
      deadline: newDate(2022, 12, 25, 0, 0),
      estimation: moment.duration(4, 'hours'),
      chillTime: moment.duration(15, 'minutes'),
    },
  }).save();

  // Those Chunks need to be thrown away by the algorithm and replanned
  await Chunk.create({
    duration: moment.duration(1, 'hour'),
    task: prepareForLogicExam,
    start: newDate(2022, 12, 16, 50),
  }).save();

  await Chunk.create({
    duration: moment.duration(1, 'hour'),
    task: prepareForLogicExam,
    start: newDate(2022, 12, 19, 50),
  }).save();

  const PrepareForPhysicsExam = await Task.create({
    name: 'Prepare for Physics',
    category: preparationCategory,
    priority: 'medium',
    isFloat: true,
    user: user,
    chunkInfo: {
      start: newDate(2022, 12, 13),
      minChunkDuration: moment.duration(1, 'hour'),
      maxChunkDuration: moment.duration(3, 'hour'),
      deadline: newDate(2022, 12, 20, 0, 0),
      estimation: moment.duration(5, 'hours'),
      chillTime: moment.duration(15, 'minutes'),
    },
  }).save();

  // Create task breakdowns for the above task

  await Chunk.create({
    duration: moment.duration(1, 'hour'),
    task: PrepareForPhysicsExam,
    start: newDate(2022, 12, 14, 20),
  }).save();

  await Chunk.create({
    duration: moment.duration(1, 'hour'),
    task: PrepareForPhysicsExam,
    start: newDate(2022, 12, 15, 20),
  }).save();

  const prepareForASD = await Task.create({
    name: 'Prepare for Algorithms and Data Structures exam',
    category: preparationCategory,
    priority: 'high',
    isFloat: true,
    user: user,
    chunkInfo: {
      start: newDate(2022, 12, 13, 24, 0),
      minChunkDuration: moment.duration(1, 'hour'),
      maxChunkDuration: moment.duration(3, 'hour'),
      estimation: moment.duration(6, 'hours'),
      deadline: newDate(2022, 12, 21, 0, 0),
      chillTime: moment.duration(15, 'minutes'),
    },
  }).save();

  // plan task

  await taskPlanner.planTask(prepareForASD);
};
