import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-errors';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { CreateConstTaskInput } from './dto/createConstTask.input';
import { CreateFloatTaskInput } from './dto/createFloatTask.input';
import { GetTasksInput } from './dto/getTask.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { ChunkInfo } from './entities/chunkInfo.entity';
import { Notification } from './entities/notification.entity';
import { Priority } from './entities/priority.entity';
import { Repeat } from './entities/repeat.entity';
import { Task } from './entities/task.entity';
import { TaskBreakdown } from './entities/taskBreakdown.entity';

@Injectable()
// TODO Move this to helpers
export class TasksService {
  async createConst(user: User, CreateConstTaskInput: CreateConstTaskInput) {
    const category = await Category.findOne(CreateConstTaskInput.categoryId);
    if (!category) {
      throw new UserInputError('Category not found');
    }
    const repeat = Repeat.create(CreateConstTaskInput.repeat);
    await Repeat.save(repeat);

    // Find if this notification exists
    let notification = await Notification.findOne({
      where: {
        timeBefore: CreateConstTaskInput.timeBeforeNotification,
      },
    });

    if (!notification && CreateConstTaskInput.timeBeforeNotification) {
      notification = await Notification.create({
        timeBefore: CreateConstTaskInput.timeBeforeNotification,
      }).save();
    }

    const priority = await Priority.findOne(CreateConstTaskInput.priorityId);

    const task = Task.create({
      user: user,
      category: category,
      isFloat: false,
      name: CreateConstTaskInput.name,
      chillTime: CreateConstTaskInput.chillTime,
      notifications: notification,
      priority: priority,
      shouldAutoResolve: CreateConstTaskInput.shouldAutoResolve,
    });
    await Task.save(task);

    // Create task breakdown and put repeat there
    const taskBreakdown = TaskBreakdown.create({
      task: task,
      repeat: repeat,
      duration: CreateConstTaskInput.duration,
      start: CreateConstTaskInput.start,
    });

    await TaskBreakdown.save(taskBreakdown);

    return task;
  }

  async createFloatTask(
    user: User,
    createFloatTaskInput: CreateFloatTaskInput
  ) {
    const category = await Category.findOne(createFloatTaskInput.categoryId);
    if (!category) {
      throw new UserInputError('Category not found');
    }
    const repeat = Repeat.create(createFloatTaskInput.repeat);
    await Repeat.save(repeat);

    let notification = await Notification.findOne({
      where: {
        timeBefore: createFloatTaskInput.timeBeforeNotification,
      },
    });

    if (!notification && createFloatTaskInput.timeBeforeNotification) {
      notification = await Notification.create({
        timeBefore: createFloatTaskInput.timeBeforeNotification,
      }).save();
    }

    const priority = await Priority.findOne(createFloatTaskInput.priorityId);

    // Create chunk info
    const chunkInfo = await ChunkInfo.create({
      ...createFloatTaskInput.chunkInfo,
    }).save();

    const task = Task.create({
      user: user,
      category: category,
      isFloat: true,
      name: createFloatTaskInput.name,
      chillTime: createFloatTaskInput.chillTime,
      notifications: notification,
      priority: priority,
      chunkInfo: chunkInfo,
      shouldAutoResolve: createFloatTaskInput.shouldAutoResolve,
    });
    await Task.save(task);

    return task;
  }

  async getTasks(user: User, getTasksInput: GetTasksInput) {
    // Get paginated results from Tasks

    return await Task.find({
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
