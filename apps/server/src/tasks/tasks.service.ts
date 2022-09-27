import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-errors';
import { Duration } from 'moment';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { User } from '../users/entities/user.entity';
import { planTask } from '../workers/taskPlanner';
import { CategoryInput } from './dto/category.input';
import { CreateConstTaskInput } from './dto/createConstTask.input';
import { CreateFloatTaskInput } from './dto/createFloatTask.input';
import { GetTasksInput } from './dto/getTasks.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { ChunkInfo } from './entities/chunkInfo.entity';
import { Notification } from './entities/notification.entity';
import { Priority } from './entities/priority.entity';
import { Repeat } from './entities/repeat.entity';
import { Task } from './entities/task.entity';
import { TaskBreakdown } from './entities/taskBreakdown.entity';

@Injectable()
export class TasksService {
  async createConst(user: User, createConstTaskInput: CreateConstTaskInput) {
    const category = await getCategory(user, createConstTaskInput.category);

    const repeat = await Repeat.create(createConstTaskInput.repeat).save();

    const notification = await getNotification(
      createConstTaskInput.timeBeforeNotification
    );

    const priority = await getPriority(createConstTaskInput.priorityId);

    const task = await Task.create({
      user: user,
      category: category,
      isFloat: false,
      name: createConstTaskInput.name,
      chillTime: createConstTaskInput.chillTime,
      notifications: notification,
      priority: priority,
      shouldAutoResolve: createConstTaskInput.shouldAutoResolve,
    }).save();

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

    const priority = await getPriority(createFloatTaskInput.priorityId);

    const chunkInfo = await ChunkInfo.create({
      ...createFloatTaskInput.chunkInfo,
      start: createFloatTaskInput.start,
    }).save();

    const task = await Task.create({
      user: user,
      category: category,
      isFloat: true,
      name: createFloatTaskInput.name,
      chillTime: createFloatTaskInput.chillTime,
      notifications: notification,
      priority: priority,
      deadline: createFloatTaskInput.deadline,
      estimation: createFloatTaskInput.estimation,
      chunkInfo: chunkInfo,
      shouldAutoResolve: createFloatTaskInput.shouldAutoResolve,
    }).save();

    planTask(task, chunkInfo);

    return task;
  }

  async getTasks(user: User, getTasksInput: GetTasksInput) {
    return await Task.find({
      relations: ['taskBreakdowns', 'taskBreakdowns.repeat'],
      where: {
        user: user,
        ...getTasksInput.filterOptions,
      },
      skip: getTasksInput.offset * getTasksInput.limit,
      take: getTasksInput.limit,
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

// TODO Move helpers to another place

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

export const getPriority = async (priorityId: number) => {
  const priority = await Priority.findOne(priorityId);

  if (!priority) {
    throw new UserInputError('Priority not found');
  }
  return priority;
};
