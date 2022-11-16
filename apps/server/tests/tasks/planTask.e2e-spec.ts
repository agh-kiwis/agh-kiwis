import moment, { Duration } from 'moment';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import { Category } from '../../src/categories/entities/category.entity';
import { Color } from '../../src/categories/entities/color.entity';
import { Repeat, RepeatType } from '../../src/tasks/entities/repeat.entity';
import { Task } from '../../src/tasks/entities/task.entity';
import { TaskBreakdown } from '../../src/tasks/entities/taskBreakdown.entity';
import { User } from '../../src/users/entities/user.entity';
import { planTask } from '../../src/workers/taskPlanner';
import connection from '../connection';

describe('PlanTask (e2e)', () => {
  let app: INestApplication | any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await connection.clear();
    await app.init();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  // TODO Add repeat param there
  const createConstTask = async (params: {
    taskName: string;
    category: Category;
    start: Date;
    user: User;
    priority?: string;
    duration?: Duration;
    repeat?: Repeat;
  }) => {
    const task = Task.create({
      name: params.taskName,
      category: params.category,
      priority: params.priority || 'medium',
      isFloat: false,
      chunkInfo: {
        start: params.start,
        chillTime: moment.duration(15, 'minutes'),
        repeat: params.repeat || {
          repeatType: RepeatType.WEEKS,
          repeatEvery: 1,
        },
      },
    });
    let taskBreakdown = TaskBreakdown.create({
      duration: params.duration || moment.duration(1, 'hour'),
      task: task,
    });

    task.taskBreakdowns = [taskBreakdown];

    task.user = Promise.resolve(params.user);
    return await task.save();
  };

  it('only float tasks', async () => {
    const user = await User.create({
      email: 'email@gmail.com',
      password: 'password1234',
    }).save();

    // Insert two colors for categories

    const redColor = await Color.create({
      hexCode: '#ff0000',
    }).save();

    const greenColor = await Color.create({
      hexCode: '#00ff00',
    }).save();

    const lectures_category = await Category.create({
      name: 'Lectures',
      //   Create a color green with id 1
      color: greenColor,
      user: user,
    }).save();

    const labs_category = await Category.create({
      name: 'Labs',
      //   Create a color red with id 1
      color: redColor,
      user: user,
    }).save();

    // Const tasks

    // HEALTH AND OTHERS
    const healthColor = await Color.create({
      hexCode: '#0000ff',
    }).save();

    const sleepCategory = await Category.create({
      name: 'Sleep',
      color: healthColor,
      user: user,
    }).save();

    const everyDayRepeat = await Repeat.create({
      repeatType: RepeatType.DAYS,
      repeatEvery: 1,
    }).save();

    await createConstTask({
      taskName: 'Sleep',
      category: sleepCategory,
      start: new Date(2022, 11, 14, 0),
      user: user,
      priority: 'high',
      duration: moment.duration(8, 'hours'),
      repeat: everyDayRepeat,
    });

    // LECTURES AND STUFF
    await createConstTask({
      taskName: 'Functional Programming',
      category: lectures_category,
      start: new Date(2022, 11, 13, 11, 15),
      user,
    });

    await createConstTask({
      taskName: 'English Language',
      category: labs_category,
      start: new Date(2022, 11, 13, 14),
      user,
    });

    await createConstTask({
      taskName: 'Algorithms and Data Structures',
      category: lectures_category,
      start: new Date(2022, 11, 14, 9, 35),
      user,
    });

    await createConstTask({
      taskName: 'Mathematic Analysis',
      category: lectures_category,
      start: new Date(2022, 11, 14, 11, 15),
      user,
    });

    await createConstTask({
      taskName: 'Mathematical Logic',
      category: labs_category,
      start: new Date(2022, 11, 14, 16, 45),
      user,
    });

    await createConstTask({
      taskName: 'Physics',
      category: labs_category,
      start: new Date(2022, 11, 15, 8),
      user,
    });

    await createConstTask({
      taskName: 'Mathematical Logic',
      category: lectures_category,
      start: new Date(2022, 11, 15, 11, 15),
      user,
    });

    await createConstTask({
      taskName: 'Intellectual Property',
      category: lectures_category,
      start: new Date(2022, 11, 15, 12, 50),
      user,
    });

    await createConstTask({
      taskName: 'Algorithms and Data Structures',
      category: lectures_category,
      start: new Date(2022, 11, 15, 14, 40),
      user,
    });

    await createConstTask({
      taskName: 'Algorithms and Data Structures',
      category: lectures_category,
      start: new Date(2022, 11, 15, 14, 40),
      user,
    });

    await createConstTask({
      taskName: 'Mathematical Analysis',
      category: labs_category,
      start: new Date(2022, 11, 15, 14, 15),
      user,
    });

    await createConstTask({
      taskName: 'Physics',
      category: lectures_category,
      start: new Date(2022, 11, 16, 15, 45),
      user,
    });

    await createConstTask({
      taskName: 'Physical Education',
      category: labs_category,
      start: new Date(2022, 11, 17, 10, 15),
      user,
    });

    await createConstTask({
      taskName: 'Imperative Programming',
      category: labs_category,
      start: new Date(2022, 11, 17, 14, 40),
      user,
    });

    // Add float task

    const yellowColor = await Color.create({
      hexCode: '#ffff00',
    }).save();

    const preparationCategory = await Category.create({
      name: 'Preparation',
      color: yellowColor,
      user: user,
    }).save();

    const prepareForASD = Task.create({
      name: 'Prepare for Algorithms and Data Structures exam',
      category: preparationCategory,
      priority: 'high',
      isFloat: true,
      chunkInfo: {
        start: new Date(2022, 11, 13, 14, 40),
        minChunkDuration: moment.duration(1, 'hour'),
        maxChunkDuration: moment.duration(3, 'hour'),
        deadline: new Date(2022, 11, 20, 0, 0),
        chillTime: moment.duration(15, 'minutes'),
      },
    });

    prepareForASD.user = Promise.resolve(user);
    await prepareForASD.save();

    // plan task

    await planTask(prepareForASD, prepareForASD.chunkInfo);
  });
});
