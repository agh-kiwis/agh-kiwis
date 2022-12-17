import { DataSource } from 'typeorm';
import moment from 'moment';
import { INestApplication } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { ConstTaskInput } from '../tasks/dto/constTask.input';
import { Chunk } from '../tasks/entities/chunk.entity';
import { Repeat, RepeatType } from '../tasks/entities/repeat.entity';
import { Task } from '../tasks/entities/task.entity';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/entities/user.entity';
import { newDate } from '../utils/myDate';
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
      chillTime: moment.duration(0, 'minutes'),
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

  // Const tasks

  await createConstTask({
    taskName: 'Sleep',
    category: sleepingCategory,
    // New date in utc
    start: newDate(new Date(2022, 12, 18, 0)),
    duration: moment.duration(6.5, 'hours'),
    user: user,
    priority: 'high',
    repeat: everyDayRepeat,
  });

  await createConstTask({
    taskName: 'Sleep_FILLER',
    category: sleepingCategory,
    // New date in utc
    start: newDate(new Date(2022, 12, 19, 0)),
    duration: moment.duration(6.5, 'hours'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Sleep_FILLER',
    category: sleepingCategory,
    // New date in utc
    start: newDate(new Date(2022, 12, 20, 0)),
    duration: moment.duration(6.5, 'hours'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Sleep_FILLER',
    category: sleepingCategory,
    // New date in utc
    start: newDate(new Date(2022, 12, 21, 0)),
    duration: moment.duration(6.5, 'hours'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Sleep_FILLER',
    category: sleepingCategory,
    // New date in utc
    start: newDate(new Date(2022, 12, 22, 0)),
    duration: moment.duration(6.5, 'hours'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Sleep_FILLER',
    category: sleepingCategory,
    // New date in utc
    start: newDate(new Date(2022, 12, 23, 0)),
    duration: moment.duration(6.5, 'hours'),
    user: user,
    priority: 'high',
  });

  await createConstTask({
    taskName: 'Const Filler_SU',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 18, 6, 30)),
    duration: moment.duration(2.5, 'hours'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_SU',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 18, 12, 30)),
    duration: moment.duration(11.5, 'hours'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_MON',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 19, 6, 30)),
    duration: moment.duration(2.5, 'hours'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_MON',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 19, 10, 0)),
    duration: moment.duration(2, 'hours'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_MON',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 19, 16, 0)),
    duration: moment.duration(8, 'hours'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_TUE',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 20, 6, 30)),
    duration: moment.duration(45, 'minutes'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_TUE',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 20, 12, 30)),
    duration: moment.duration(11.5, 'hours'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_THU',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 21, 15, 0)),
    duration: moment.duration(9, 'hours'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_FRI',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 22, 8, 0)),
    duration: moment.duration(2, 'hours'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_FRI',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 22, 11, 30)),
    duration: moment.duration(2.5, 'hours'),
    user,
  });

  await createConstTask({
    taskName: 'Const Filler_FRI',
    category: lectures_category,
    start: newDate(new Date(2022, 12, 22, 15, 0)),
    duration: moment.duration(9, 'hours'),
    user,
  });

  // await createConstTask({
  //   taskName: 'English Language',
  //   category: labs_category,
  //   start: newDate(new Date(2022, 12, 14, 14)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Algorithms and Data Structures',
  //   category: lectures_category,
  //   start: newDate(new Date(2022, 12, 14, 9, 35)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Mathematic Analysis',
  //   category: lectures_category,
  //   start: newDate(new Date(2022, 12, 14, 11, 15)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Mathematical Logic',
  //   category: labs_category,
  //   start: newDate(new Date(2022, 12, 14, 16, 15)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Physics',
  //   category: labs_category,
  //   start: newDate(new Date(2022, 12, 15, 8)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Mathematical Logic',
  //   category: lectures_category,
  //   start: newDate(new Date(2022, 12, 15, 11, 15)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Intellectual Property',
  //   category: lectures_category,
  //   start: newDate(new Date(2022, 12, 15, 12, 50)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Algorithms and Data Structures',
  //   category: lectures_category,
  //   start: newDate(new Date(2022, 12, 15, 14, 40)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Algorithms and Data Structures',
  //   category: lectures_category,
  //   start: newDate(new Date(2022, 12, 15, 14, 40)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Mathematical Analysis',
  //   category: labs_category,
  //   start: newDate(new Date(2022, 12, 15, 14, 15)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Physics',
  //   category: lectures_category,
  //   start: newDate(new Date(2022, 12, 16, 15, 45)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Physical Education',
  //   category: labs_category,
  //   start: newDate(new Date(2022, 12, 17, 10, 15)),
  //   user,
  // });

  // await createConstTask({
  //   taskName: 'Imperative Programming',
  //   category: labs_category,
  //   start: newDate(new Date(2022, 12, 17, 14, 40)),
  //   user,
  // });

  // Add float tasks

  // const prepareForLogicExam = await Task.create({
  //   name: 'Prepare for Logic',
  //   category: preparationCategory,
  //   priority: 'medium',
  //   isFloat: true,
  //   user: user,
  //   chunkInfo: {
  //     start: newDate(new Date(2022, 12, 13)),
  //     minChunkDuration: moment.duration(1, 'hour'),
  //     maxChunkDuration: moment.duration(3, 'hour'),
  //     deadline: newDate(new Date(2022, 12, 25, 0, 0)),
  //     estimation: moment.duration(4, 'hours'),
  //     chillTime: moment.duration(15, 'minutes'),
  //   },
  // }).save();

  // Those Chunks need to be thrown away by the algorithm and replanned
  // await Chunk.create({
  //   duration: moment.duration(1, 'hour'),
  //   task: prepareForLogicExam,
  //   start: newDate(new Date(2022, 12, 16, 50)),
  // }).save();

  // await Chunk.create({
  //   duration: moment.duration(1, 'hour'),
  //   task: prepareForLogicExam,
  //   start: newDate(new Date(2022, 12, 19, 50)),
  // }).save();

  const A = await Task.create({
    name: 'A',
    category: preparationCategory,
    priority: 'medium',
    isFloat: true,
    user: user,
    chunkInfo: {
      start: newDate(new Date(2022, 12, 18)),
      minChunkDuration: moment.duration(1, 'hour'),
      maxChunkDuration: moment.duration(1.5, 'hour'),
      deadline: newDate(new Date(2022, 12, 20, 0, 0)),
      estimation: moment.duration(3, 'hours'),
      chillTime: moment.duration(20, 'minutes'),
    },
  }).save();

  // Create task breakdowns for the above task

  // await Chunk.create({
  //   duration: moment.duration(1, 'hour'),
  //   task: PrepareForPhysicsExam,
  //   start: newDate(new Date(2022, 12, 14, 20)),
  // }).save();

  // await Chunk.create({
  //   duration: moment.duration(1, 'hour'),
  //   task: PrepareForPhysicsExam,
  //   start: newDate(new Date(2022, 12, 15, 20)),
  // }).save();

  const B = await Task.create({
    name: 'B',
    category: preparationCategory,
    priority: 'high',
    isFloat: true,
    user: user,
    chunkInfo: {
      start: newDate(new Date(2022, 12, 18)),
      minChunkDuration: moment.duration(0.5, 'hour'),
      maxChunkDuration: moment.duration(2, 'hour'),
      deadline: newDate(new Date(2022, 12, 22, 0, 0)),
      estimation: moment.duration(5, 'hours'),
      chillTime: moment.duration(30, 'minutes'),
    },
  }).save();

  const C = await Task.create({
    name: 'C',
    category: preparationCategory,
    priority: 'low',
    isFloat: true,
    user: user,
    chunkInfo: {
      start: newDate(new Date(2022, 12, 18)),
      minChunkDuration: moment.duration(0.5, 'hour'),
      maxChunkDuration: moment.duration(0.5, 'hour'),
      estimation: moment.duration(2, 'hours'),
      deadline: newDate(new Date(2022, 12, 23, 0, 0)),
      chillTime: moment.duration(0, 'minutes'),
    },
  }).save();

  await taskPlanner.planTask(A);
  await taskPlanner.planTask(B);
  await taskPlanner.planTask(C);

  // plan task
};
