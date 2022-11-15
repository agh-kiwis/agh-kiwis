import { UserInputError } from 'apollo-server-errors';
import { In } from 'typeorm';
import { Duration } from 'moment';
import { Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { User } from '../users/entities/user.entity';
import { planTask } from '../workers/taskPlanner';
import { CategoryInput } from './dto/category.input';
import { CreateConstTaskInput } from './dto/createConstTask.input';
import { CreateFloatTaskInput } from './dto/createFloatTask.input';
import { GetTasksInput } from './dto/getTasks.input';
import { TaskInput } from './dto/task.input';
import { ChunkInfo } from './entities/chunkInfo.entity';
import { Notification } from './entities/notification.entity';
import { Repeat } from './entities/repeat.entity';
import { Task } from './entities/task.entity';
import { TaskBreakdown } from './entities/taskBreakdown.entity';

@Injectable()
export class TasksService {
  async createConst(user: User, createConstTaskInput: CreateConstTaskInput) {
    const category = await getCategory(user, createConstTaskInput.category);

    let repeat: Repeat;
    if (createConstTaskInput.repeat) {
      repeat = await Repeat.create(createConstTaskInput.repeat).save();
    }

    const notification = await getNotification(
      createConstTaskInput.timeBeforeNotification
    );

    let task = Task.create({
      category: category,
      isFloat: false,
      name: createConstTaskInput.name,
      chillTime: createConstTaskInput.chillTime,
      notifications: notification,
      priority: createConstTaskInput.priority,
      shouldAutoResolve: createConstTaskInput.shouldAutoResolve,
    });

    task.user = Promise.resolve(user);

    task = await task.save();

    await TaskBreakdown.create({
      task: task,
      repeat: repeat,
      duration: createConstTaskInput.duration,
      start: createConstTaskInput.start,
    }).save();

    return task;
  }

  async createFloatTask(
    user: User,
    createFloatTaskInput: CreateFloatTaskInput
  ) {
    const category = await getCategory(user, createFloatTaskInput.category);

    const notification = await getNotification(
      createFloatTaskInput.timeBeforeNotification
    );

    const chunkInfo = await ChunkInfo.create({
      ...createFloatTaskInput.chunkInfo,
      start: createFloatTaskInput.start,
    }).save();

    let task = Task.create({
      category: category,
      isFloat: true,
      name: createFloatTaskInput.name,
      chillTime: createFloatTaskInput.chillTime,
      notifications: notification,
      priority: createFloatTaskInput.priority,
      deadline: createFloatTaskInput.deadline,
      estimation: createFloatTaskInput.estimation,
      chunkInfo: chunkInfo,
      shouldAutoResolve: createFloatTaskInput.shouldAutoResolve,
    });

    task.user = Promise.resolve(user);

    task = await task.save();

    planTask(task, chunkInfo);

    return task;
  }

  async getTasks(user: User, getTasksInput: GetTasksInput) {
    return await Task.find({
      relations: ['taskBreakdowns', 'taskBreakdowns.repeat'],
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
      relations: ['taskBreakdowns', 'taskBreakdowns.repeat'],
      where: {
        user: user,
        id: id,
      },
    });
  }

  async updateConstTask(user: User, updateTaskInput: TaskInput) {
    let task: Task = await Task.findOne({
      relations: ['taskBreakdowns', 'taskBreakdowns.repeat'],
      where: {
        id: updateTaskInput.id,
      },
    });

    const category = await getCategory(user, updateTaskInput.category);

    const notification = await getNotification(
      updateTaskInput.timeBeforeNotification
    );

    task.category = category;
    task.isFloat = false;
    task.name = updateTaskInput.name;
    task.chillTime = updateTaskInput.chillTime;
    task.notifications = notification;
    task.priority = updateTaskInput.priority;
    task.shouldAutoResolve = updateTaskInput.shouldAutoResolve;

    task = await task.save();

    const taskBreakdown = await TaskBreakdown.findOne({
      where: {
        task: task,
      },
    });

    let repeat: Repeat;
    if (updateTaskInput.repeat) {
      repeat = await Repeat.create(updateTaskInput.repeat).save();
    }

    taskBreakdown.repeat = repeat;
    taskBreakdown.duration = updateTaskInput.duration;
    taskBreakdown.start = updateTaskInput.start;

    await taskBreakdown.save();

    return task;
  }

  async updateFloatTask(user: User, updateTaskInput: TaskInput) {
    let task: Task = await Task.findOne({
      relations: ['taskBreakdowns', 'taskBreakdowns.repeat'],
      where: {
        id: updateTaskInput.id,
      },
    });

    const category = await getCategory(user, updateTaskInput.category);

    const notification = await getNotification(
      updateTaskInput.timeBeforeNotification
    );

    const chunkInfo = await ChunkInfo.create({
      ...updateTaskInput.chunkInfo,
      start: updateTaskInput.start,
    }).save();

    task.category = category;
    task.isFloat = true;
    task.name = updateTaskInput.name;
    task.chillTime = updateTaskInput.chillTime;
    task.notifications = notification;
    task.priority = updateTaskInput.priority;
    task.deadline = updateTaskInput.deadline;
    task.estimation = updateTaskInput.estimation;
    task.chunkInfo = chunkInfo;
    task.shouldAutoResolve = updateTaskInput.shouldAutoResolve;

    task = await task.save();

    await planTask(task, chunkInfo);

    return task;
  }

  async update(updateTaskInput: TaskInput) {
    await Task.update(updateTaskInput.id, updateTaskInput);

    return await Task.findOne({
      relations: ['taskBreakdowns', 'taskBreakdowns.repeat'],
      where: {
        id: updateTaskInput.id,
      },
    });
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
