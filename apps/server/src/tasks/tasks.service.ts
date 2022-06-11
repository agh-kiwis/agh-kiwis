import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-errors';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { CreateConstTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Repeat } from './entities/repeat.entity';
import { Task } from './entities/task.entity';
import { TaskBreakdown } from './entities/taskBreakdown.entity';

@Injectable()
export class TasksService {
  async createConst(user: User, CreateConstTaskInput: CreateConstTaskInput) {
    const category = await Category.findOne(CreateConstTaskInput.categoryId);
    if (!category) {
      throw new UserInputError('Category not found');
    }
    const repeat = Repeat.create(CreateConstTaskInput.repeat);
    await Repeat.save(repeat);

    console.log(CreateConstTaskInput.duration, 'duration');
    console.log(CreateConstTaskInput.chillTime, 'chillTime');

    const task = Task.create({
      user: user,
      category: category,
      isFloat: false,
      name: CreateConstTaskInput.name,
      chillTime: CreateConstTaskInput.chillTime,
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

  findAll() {
    return `This action returns all tasks`;
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
