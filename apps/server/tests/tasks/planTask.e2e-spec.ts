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

    // CONST TASKS PREPARATION

    await createConstTask({
      taskName: 'Sleep',
      category: sleepCategory,
      // New date in utc
      start: newDate(new Date(2022, 12, 18, 0)),
      duration: moment.duration(6.5, 'hours'),
      user: user,
      priority: 'high',
      repeat: everyDayRepeat,
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
        start: newDate(new Date(2022, 12, 18)),
        minChunkDuration: moment.duration(1, 'hour'),
        maxChunkDuration: moment.duration(1.5, 'hour'),
        deadline: newDate(new Date(2022, 12, 20, 0, 0)),
        estimation: moment.duration(3, 'hours'),
        chillTime: moment.duration(20, 'minutes'),
      },
    }).save();

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
  });
});

function newDate(date: Date): Date {
  date.setMonth(date.getMonth() - 1);
  return date;
}
