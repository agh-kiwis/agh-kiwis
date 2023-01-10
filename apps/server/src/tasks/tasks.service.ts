import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-errors';
import moment, { Duration } from 'moment';
import { Equal, In, IsNull, Not } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { OrderOptions } from '../ordering/order.options';
import { OrderService } from '../ordering/order.service';
import { PaginationOptions } from '../pagination/pagination.options';
import { PaginationService } from '../pagination/pagination.service';
import { User } from '../users/entities/user.entity';
import { TaskPlanner } from '../workers/taskPlanner';
import { Chunk } from './chunks/chunk.entity';
import { CategoryInput } from './dto/category.input';
import { ChunkInput } from './dto/chunkInput';
import { ConstTaskInput } from './dto/constTask.input';
import { FloatTaskInput } from './dto/floatTask.input';
import { TaskInput } from './dto/task.input';
import { TaskFilterOptions } from './dto/taskFilter.options';
import { ChunkInfo } from './entities/chunkInfo.entity';
import { Notification } from './entities/notification.entity';
import { Repeat } from './entities/repeat.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    private readonly orderService: OrderService,
    private readonly paginationService: PaginationService,
    private readonly taskPlanner: TaskPlanner
  ) {}

  async createConst(user: User, ConstTaskInput: ConstTaskInput) {
    const category = await getCategory(user, ConstTaskInput.category);

    let repeat: Repeat;
    if (ConstTaskInput.repeat) {
      repeat = await Repeat.create({
        ...ConstTaskInput.repeat,
      }).save();
    }

    const notification = await getNotification(
      ConstTaskInput.timeBeforeNotification
    );

    const chunkInfo = await ChunkInfo.create({
      ...ConstTaskInput,
      repeat: repeat,
    }).save();

    const task = await Task.create({
      category: category,
      isFloat: false,
      chunkInfo: chunkInfo,
      user: user,
      name: ConstTaskInput.name,
      notifications: notification,
      priority: ConstTaskInput.priority,
      shouldAutoResolve: ConstTaskInput.shouldAutoResolve,
    }).save();

    if (repeat) {
      await this.upsertChunksForRepeatTask(task);
    } else {
      await Chunk.create({
        task: task,
        duration: ConstTaskInput.duration,
        start: ConstTaskInput.start,
      }).save();
    }

    return await Task.findOne({
      where: {
        id: task.id,
      },
    });
  }

  async createFloatTask(user: User, FloatTaskInput: FloatTaskInput) {
    const category = await getCategory(user, FloatTaskInput.category);

    const notification = await getNotification(
      FloatTaskInput.timeBeforeNotification
    );

    const chunkInfo = await ChunkInfo.create({
      ...FloatTaskInput,
    }).save();

    const task = await Task.create({
      category: category,
      isFloat: true,
      user: user,
      name: FloatTaskInput.name,
      notifications: notification,
      priority: FloatTaskInput.priority,
      chunkInfo: chunkInfo,
      shouldAutoResolve: FloatTaskInput.shouldAutoResolve,
    }).save();

    await this.taskPlanner.planTask(task);
    return task;
  }

  async upsertChunksForRepeatTask(task: Task) {
    const repeat = task.chunkInfo.repeat;

    const repeatUntil = repeat.repeatUntil
      ? moment(repeat.repeatUntil)
      : moment(task.chunkInfo.start).clone().add(2, 'month');

    const chunkList = [];
    let currentChunkStart = moment(task.chunkInfo.start);

    // Compare
    while (currentChunkStart.isSameOrBefore(repeatUntil)) {
      chunkList.push({
        task: task,
        duration: task.chunkInfo.duration,
        start: currentChunkStart,
      });

      // Add repeatEvery repeatType to the currentChunkStart using moment
      currentChunkStart = moment(currentChunkStart).add(
        repeat.repeatEvery,
        repeat.repeatType
          .toString()
          .toLowerCase() as moment.unitOfTime.DurationConstructor
      );
    }

    await Chunk.save(chunkList);
  }

  async tasks(
    user: User,
    taskFilterOptions: TaskFilterOptions,
    paginationOptions: PaginationOptions,
    orderOptions: OrderOptions
  ) {
    let queryBuilder = Task.createQueryBuilder('task')
      // TODO Move that to a different service and use .andWhere
      .innerJoinAndSelect('task.chunkInfo', 'chunkInfo')
      .innerJoinAndSelect('task.category', 'category')
      .innerJoinAndSelect('category.color', 'color')
      .where({
        ...(taskFilterOptions?.ids && {
          id: In(taskFilterOptions.ids),
        }),
        ...(taskFilterOptions?.isDone && {
          isDone: taskFilterOptions.isDone,
        }),
        ...(taskFilterOptions?.category && {
          category: In(taskFilterOptions.category),
        }),
        ...(taskFilterOptions?.priority && {
          priority: In(taskFilterOptions?.priority),
        }),
        ...(typeof taskFilterOptions?.repeat === 'boolean' && {
          chunkInfo: {
            repeat: taskFilterOptions?.repeat ? Not(IsNull()) : IsNull(),
          },
        }),
        user: { id: user.id },
      });

    queryBuilder = this.orderService.order(orderOptions, queryBuilder);

    queryBuilder = this.paginationService.paginate(
      paginationOptions,
      queryBuilder
    );

    return queryBuilder.getMany();
  }

  async chunksFieldResolve(
    taskIds: number[],
    paginationOptions: PaginationOptions,
    orderOptions: OrderOptions
  ): Promise<[Chunk & { taskId: number }]> {
    // TODO Place this in a different service  and generalise
    return await Chunk.query(
      `
        SELECT chunk_virtual.* FROM (
        SELECT c.*,
        rank() OVER (
            PARTITION BY c."taskId"
            order by c.${orderOptions?.field} ${
        orderOptions?.desc ? 'DESC' : 'ASC'
      }
        ) as rank
        FROM chunk c
    ) chunk_virtual
    WHERE rank <= ${
      paginationOptions?.limit * (paginationOptions?.offset + 1)
    } and rank >= ${
        paginationOptions?.limit * paginationOptions?.offset
      } and chunk_virtual."taskId" IN (${taskIds.join(',')})
    `
    );
  }

  async resolveNotificationsField(taskIds: number[]) {
    return Task.createQueryBuilder('task')
      .leftJoinAndSelect('task.notifications', 'notifications')
      .where('task.id IN (:...taskIds)', { taskIds })
      .select('task')
      .addSelect('notifications')
      .getMany();
  }

  async update(id: number, updateTaskInput: TaskInput) {
    const task: Task = await Task.findOne({
      relations: {
        chunks: true,
        chunkInfo: {
          repeat: true,
        },
      },
      where: {
        id: id,
      },
    });

    task.isDone = updateTaskInput.isDone;

    await task.save();

    return task;
  }

  async updateConstTask(
    user: User,
    id: number,
    updateTaskInput: ConstTaskInput
  ) {
    let task: Task = await Task.findOne({
      relations: {
        chunks: true,
        chunkInfo: {
          repeat: true,
        },
      },
      where: {
        id: id,
      },
    });

    const category = await getCategory(user, updateTaskInput.category);

    const notification = await getNotification(
      updateTaskInput.timeBeforeNotification
    );

    task.category = category;
    task.isFloat = false;
    task.name = updateTaskInput.name;
    task.chunkInfo.chillTime = updateTaskInput.chillTime;
    task.notifications = notification;
    task.priority = updateTaskInput.priority;
    task.shouldAutoResolve = updateTaskInput.shouldAutoResolve;

    task = await task.save();

    const chunk = await Chunk.findOne({
      where: {
        task: {
          id: task.id,
        },
      },
    });

    let repeat: Repeat;
    if (updateTaskInput.repeat) {
      repeat = await Repeat.create({
        ...updateTaskInput.repeat,
      }).save();
      task.chunkInfo.repeat = repeat;
      await task.save();
    }

    chunk.duration = updateTaskInput.duration;
    chunk.start = updateTaskInput.start;

    await chunk.save();

    return task;
  }

  async updateFloatTask(
    user: User,
    id: number,
    updateTaskInput: FloatTaskInput
  ) {
    let task: Task = await Task.findOne({
      relations: {
        chunks: true,
        chunkInfo: {
          repeat: true,
        },
      },
      where: {
        id: id,
      },
    });

    const category = await getCategory(user, updateTaskInput.category);

    const notification = await getNotification(
      updateTaskInput.timeBeforeNotification
    );

    const chunkInfo = await ChunkInfo.create({
      ...updateTaskInput,
    }).save();

    task.category = category;
    task.isFloat = true;
    task.name = updateTaskInput.name;
    task.notifications = notification;
    task.priority = updateTaskInput.priority;
    task.chunkInfo = chunkInfo;
    task.shouldAutoResolve = updateTaskInput.shouldAutoResolve;

    task = await task.save();

    await this.taskPlanner.planTask(task);

    return task;
  }

  async updateChunk(id: number, updateChunkInput: ChunkInput) {
    const chunk: Chunk = await Chunk.findOne({
      where: {
        id: id,
      },
    });

    chunk.start = updateChunkInput.start;
    chunk.duration = updateChunkInput.duration;
    chunk.isDone = updateChunkInput.isDone;

    await chunk.save();

    return chunk;
  }

  async remove(user: User, id: number) {
    const task: Task = await Task.findOne({
      where: {
        id: id,
        user: { id: user.id },
      },
    });

    if (task) {
      await Task.delete(id);
      return task;
    }
  }
}

export const getCategory = async (user: User, categoryInput: CategoryInput) => {
  let category: Category;
  if (categoryInput.id) {
    category = await Category.findOne({
      where: {
        id: categoryInput.id,
      },
    });
    if (!category) {
      throw new UserInputError('Category not found');
    }
  } else if (categoryInput.newCategory) {
    const newCategory = categoryInput.newCategory;
    const color = await Color.findOne({
      where: { id: newCategory.colorId },
    });

    category = await Category.create({
      color: color,
      user: user,
      name: newCategory.name,
    }).save();
  } else {
    throw new UserInputError('Specify category id or give newCategory input');
  }
  return category;
};

export const getNotification = async (timeBeforeNotification: Duration) => {
  let notification = await Notification.findOne({
    where: {
      timeBefore: Equal(timeBeforeNotification),
    },
  });

  if (!notification && timeBeforeNotification) {
    notification = await Notification.create({
      timeBefore: timeBeforeNotification,
    }).save();
  }
  return notification;
};
