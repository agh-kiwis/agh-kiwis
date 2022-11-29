import { UserInputError } from 'apollo-server-errors';
import { In } from 'typeorm';
import moment, { Duration } from 'moment';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { User } from '../users/entities/user.entity';
import { planTask } from '../workers/taskPlanner';
import { CategoryInput } from './dto/category.input';
import { ConstTaskInput } from './dto/constTask.input';
import { FloatTaskInput } from './dto/floatTask.input';
import { GetTasksInput } from './dto/getTasks.input';
import { TaskInput } from './dto/task.input';
import { Chunk } from './entities/chunk.entity';
import { ChunkInfo } from './entities/chunkInfo.entity';
import { Notification } from './entities/notification.entity';
import { Repeat } from './entities/repeat.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  @Cron('* */1 * * * *')
  triggerMarkingAsDone() {
    this.markTasksAsDone();
  }

  async markTasksAsDone() {
    const tasks: Task[] = await Task.find({
      relations: ['chunks', 'chunkInfo'],
    });

    tasks
      .filter((task) => task.shouldAutoResolve)
      .map((task) => {
        if (task.isFloat) {
          if (this.isPastDeadline(task)) {
            // mark task as done (and it's corresponding chunks)
          } else {
            // mark specific chunks as done
          }
        } else if (task.chunkInfo.repeat) {
          // mark specific chunks as done
        } else if (this.isConstTaskEnded(task)) {
          // mark task as done (and it's corresponding chunks)
        }
      });
  }

  private isPastDeadline(task: Task): boolean {
    return moment(task.chunkInfo.deadline).isBefore(moment());
  }

  private isConstTaskEnded(task: Task): boolean {
    return moment(task.chunkInfo.start)
      .add(task.chunkInfo.duration)
      .isBefore(moment());
  }

  async createConst(user: User, ConstTaskInput: ConstTaskInput) {
    const category = await getCategory(user, ConstTaskInput.category);

    let repeat: Repeat;
    if (ConstTaskInput.repeat) {
      repeat = await Repeat.create(ConstTaskInput.repeat).save();
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

    // Fetch task one more time with chunks as chunks
    const taskToReturn = await Task.findOne({
      relations: ['chunks'],
      where: {
        id: task.id,
      },
    });

    return taskToReturn;
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

    await planTask(task);

    return task;
  }

  async upsertChunksForRepeatTask(task: Task) {
    const chunkInfo = task.chunkInfo;

    if (!chunkInfo) {
      throw new UserInputError('Task is not a repeat task');
    }

    const repeat = task.chunkInfo.repeat;

    if (!repeat) {
      throw "Task doesn't have a repeat pattern";
    }

    // First we need to remove all the existing chunks if they exist
    await Chunk.delete({
      task: task,
    });

    const repeatUntil = repeat.repeatUntil
      ? moment(repeat.repeatUntil)
      : moment(task.chunkInfo.start).add(2, 'month');

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

  async getTasks(user: User, getTasksInput: GetTasksInput) {
    return await Task.find({
      relations: ['chunks', 'chunkInfo', 'chunkInfo.repeat'],
      where: {
        user: user,
        ...getTasksInput.filterOptions,
        ...(getTasksInput.filterOptions.category && {
          category: In(getTasksInput.filterOptions.category),
        }),
        ...(getTasksInput.filterOptions.priority && {
          priority: In(getTasksInput.filterOptions.priority),
        }),
      },
      skip: getTasksInput.offset * getTasksInput.limit,
      take: getTasksInput.limit,
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async getTask(user: User, id: string) {
    return await Task.findOne({
      relations: ['chunks', 'chunkInfo', 'chunkInfo.repeat'],
      where: {
        user: user,
        id: id,
      },
    });
  }

  async update(id: number, updateTaskInput: TaskInput) {
    const task: Task = await Task.findOne({
      relations: ['chunks', 'chunkInfo', 'chunkInfo.repeat'],
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
      relations: ['chunks', 'chunkInfo', 'chunkInfo.repeat'],
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
        task: task,
      },
    });

    let repeat: Repeat;
    if (updateTaskInput.repeat) {
      repeat = await Repeat.create(updateTaskInput.repeat).save();
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
      relations: ['chunks', 'chunkInfo', 'chunkInfo.repeat'],
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

    await planTask(task);

    return task;
  }

  async remove(user: User, id: number) {
    const task: Task = await Task.findOne({
      where: {
        id: id,
        user: user,
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
    category = await Category.findOne(categoryInput.id);
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
      timeBefore: timeBeforeNotification,
    },
  });

  if (!notification && timeBeforeNotification) {
    notification = await Notification.create({
      timeBefore: timeBeforeNotification,
    }).save();
  }
  return notification;
};
