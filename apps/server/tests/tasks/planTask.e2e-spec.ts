import moment, { Duration } from 'moment';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import { Category } from '../../src/categories/entities/category.entity';
import { Color } from '../../src/categories/entities/color.entity';
import { ConstTaskInput } from '../../src/tasks/dto/constTask.input';
import { Chunk } from '../../src/tasks/entities/chunk.entity';
import { Repeat, RepeatType } from '../../src/tasks/entities/repeat.entity';
import { Task } from '../../src/tasks/entities/task.entity';
import { TasksService } from '../../src/tasks/tasks.service';
import { User } from '../../src/users/entities/user.entity';
import { TaskPlanner } from '../../src/workers/taskPlanner';
import connection from '../connection';

describe('PlanTask (e2e)', () => {
  let app: INestApplication | any;

  let taskPlanner: TaskPlanner;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    taskPlanner = app.get(TaskPlanner);
    await connection.clear(app);
    await app.init();
  });

  beforeEach(async () => {
    // await connection.clear();
  });

  afterAll(async () => {
    await connection.close(app);
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

  it('greedy approach test', async () => {
    const user = await User.create({
      email: 'email@gmail.com',
      password: 'password1234',
    }).save();

    // Single color for category

    const greenColor = await Color.create({
      hexCode: '#00ff00',
    }).save();

    // Single category

    const lecturesCategory = await Category.create({
      name: 'Lectures',
      color: greenColor,
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

    // CONST TASKS PREPARATION
    // Repeated chunks added manually, because repeat doesn`t work now

    await createConstTask({
      taskName: 'Sleep',
      category: sleepCategory,
      // New date in utc
      start: newDate(new Date(2022, 12, 20, 0)),
      duration: moment.duration(9, 'hours'),
      user: user,
      priority: 'high',
      repeat: everyDayRepeat,
    });

    await createConstTask({
      taskName: 'Sleep',
      category: sleepCategory,
      // New date in utc
      start: newDate(new Date(2022, 12, 21, 0)),
      duration: moment.duration(9, 'hours'),
      user: user,
      priority: 'high',
    });

    await createConstTask({
      taskName: 'Sleep',
      category: sleepCategory,
      // New date in utc
      start: newDate(new Date(2022, 12, 22, 0)),
      duration: moment.duration(12, 'hours'),
      user: user,
      priority: 'high',
    });

    await createConstTask({
      taskName: 'Lectures',
      category: lecturesCategory,
      start: newDate(new Date(2022, 12, 20, 10, 0)),
      duration: moment.duration(2, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Lectures',
      category: lecturesCategory,
      start: newDate(new Date(2022, 12, 20, 12, 15)),
      duration: moment.duration(705, 'minutes'),
      user,
    });

    await createConstTask({
      taskName: 'Lectures',
      category: lecturesCategory,
      start: newDate(new Date(2022, 12, 21, 10, 0)),
      duration: moment.duration(2, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Lectures',
      category: lecturesCategory,
      start: newDate(new Date(2022, 12, 21, 12, 15)),
      duration: moment.duration(705, 'minutes'),
      user,
    });

    await createConstTask({
      taskName: 'Lectures',
      category: lecturesCategory,
      start: newDate(new Date(2022, 12, 21, 12, 15)),
      duration: moment.duration(24, 'hours'),
      user,
    });

    // Add float tasks

    const yellowColor = await Color.create({
      hexCode: '#ffff00',
    }).save();

    const preparationCategory = await Category.create({
      name: 'Preparation',
      color: yellowColor,
      user: user,
    }).save();

    // Now let's simulate already planned float task:

    const A = await Task.create({
      name: 'A',
      category: preparationCategory,
      priority: 'high',
      isFloat: true,
      user: user,
      chunkInfo: {
        start: newDate(new Date(2022, 12, 20)),
        minChunkDuration: moment.duration(15, 'minutes'),
        maxChunkDuration: moment.duration(15, 'minutes'),
        deadline: newDate(new Date(2022, 12, 22, 0, 0)),
        estimation: moment.duration(30, 'minutes'),
        chillTime: moment.duration(0, 'minutes'),
      },
    }).save();

    const B = await Task.create({
      name: 'B',
      category: preparationCategory,
      priority: 'low',
      isFloat: true,
      user: user,
      chunkInfo: {
        start: newDate(new Date(2022, 12, 20)),
        minChunkDuration: moment.duration(60, 'minutes'),
        maxChunkDuration: moment.duration(60, 'minutes'),
        deadline: newDate(new Date(2022, 12, 23, 0, 0)),
        estimation: moment.duration(120, 'minutes'),
        chillTime: moment.duration(0, 'minutes'),
      },
    }).save();

    await taskPlanner.planTask(A);
    await taskPlanner.planTask(B);
  });
});

describe('PlanTask (e2e)', () => {
  let app: INestApplication | any;

  let taskPlanner: TaskPlanner;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    taskPlanner = app.get(TaskPlanner);
    await connection.clear(app);
    await app.init();
  });

  beforeEach(async () => {
    // await connection.clear();
  });

  afterAll(async () => {
    await connection.close(app);
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

  it('3 tasks', async () => {
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
      color: greenColor,
      user: user,
    }).save();

    const labs_category = await Category.create({
      name: 'Labs',
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

    // CONST TASKS PREPARATION

    await createConstTask({
      taskName: 'Sleep',
      category: sleepCategory,
      // New date in utc
      start: newDate(new Date(2022, 12, 20, 0)),
      duration: moment.duration(6.5, 'hours'),
      user: user,
      priority: 'high',
      repeat: everyDayRepeat,
    });

    await createConstTask({
      taskName: 'Const Filler_SU',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 20, 6, 30)),
      duration: moment.duration(2.5, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_SU',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 20, 12, 30)),
      duration: moment.duration(11.5, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_MON',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 21, 6, 30)),
      duration: moment.duration(2.5, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_MON',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 21, 10, 0)),
      duration: moment.duration(2, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_MON',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 21, 16, 0)),
      duration: moment.duration(8, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_TUE',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 22, 6, 30)),
      duration: moment.duration(45, 'minutes'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_TUE',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 22, 12, 30)),
      duration: moment.duration(11.5, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_THU',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 23, 15, 0)),
      duration: moment.duration(9, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_FRI',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 24, 8, 0)),
      duration: moment.duration(2, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_FRI',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 24, 11, 30)),
      duration: moment.duration(2.5, 'hours'),
      user,
    });

    await createConstTask({
      taskName: 'Const Filler_FRI',
      category: lectures_category,
      start: newDate(new Date(2022, 12, 24, 15, 0)),
      duration: moment.duration(9, 'hours'),
      user,
    });

    // Add float tasks

    const yellowColor = await Color.create({
      hexCode: '#ffff00',
    }).save();

    const preparationCategory = await Category.create({
      name: 'Preparation',
      color: yellowColor,
      user: user,
    }).save();

    // Now let's simulate already planned float task:

    const A = await Task.create({
      name: 'A',
      category: preparationCategory,
      priority: 'medium',
      isFloat: true,
      user: user,
      chunkInfo: {
        start: newDate(new Date(2022, 12, 20)),
        minChunkDuration: moment.duration(1, 'hour'),
        maxChunkDuration: moment.duration(1.5, 'hour'),
        deadline: newDate(new Date(2022, 12, 22, 0, 0)),
        estimation: moment.duration(3, 'hours'),
        chillTime: moment.duration(20, 'minutes'),
      },
    }).save();

    const B = await Task.create({
      name: 'B',
      category: preparationCategory,
      priority: 'high',
      isFloat: true,
      user: user,
      chunkInfo: {
        start: newDate(new Date(2022, 12, 20)),
        minChunkDuration: moment.duration(0.5, 'hour'),
        maxChunkDuration: moment.duration(2, 'hour'),
        deadline: newDate(new Date(2022, 12, 24, 0, 0)),
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
        start: newDate(new Date(2022, 12, 20)),
        minChunkDuration: moment.duration(0.5, 'hour'),
        maxChunkDuration: moment.duration(0.5, 'hour'),
        estimation: moment.duration(2, 'hours'),
        deadline: newDate(new Date(2022, 12, 25, 0, 0)),
        chillTime: moment.duration(0, 'minutes'),
      },
    }).save();

    await taskPlanner.planTask(A);
    await taskPlanner.planTask(B);
    await taskPlanner.planTask(C);
  });
});

function newDate(date: Date): Date {
  date.setMonth(date.getMonth() - 1);
  return date;
}
