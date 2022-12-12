import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../providers/user.provider';
import { User } from '../users/entities/user.entity';
import { ConstTaskInput } from './dto/constTask.input';
import { FloatTaskInput } from './dto/floatTask.input';
import { GetTasksInput } from './dto/getTasks.input';
import { TaskInput } from './dto/task.input';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  addConstTask(
    @CurrentUser() user: User,
    @Args('ConstTaskInput') ConstTaskInput: ConstTaskInput
  ) {
    return this.tasksService.createConst(user, ConstTaskInput);
  }

  @Mutation(() => Task)
  addFloatTask(
    @CurrentUser() user: User,
    @Args('FloatTaskInput') FloatTaskInput: FloatTaskInput
  ) {
    return this.tasksService.createFloatTask(user, FloatTaskInput);
  }

  @Query(() => [Task])
  getTasks(
    @CurrentUser() user: User,
    @Args('getTasksInput') getTasksInput: GetTasksInput
  ) {
    return this.tasksService.getTasks(user, getTasksInput);
  }

  @Query(() => Task)
  getTask(@CurrentUser() user: User, @Args('id') id: string) {
    return this.tasksService.getTask(user, id);
  }

  @Mutation(() => Task)
  async updateTask(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('taskInput') taskInput: TaskInput
  ) {
    const task = await Task.findOne({
      where: { id },
    });
    if (!task) {
      throw new Error('Task not found');
    }
    if (task.user.id !== user?.id) {
      throw new Error('Task does not belong to user');
    }
    const result = await this.tasksService.update(id, taskInput);
    return result;
  }

  @Mutation(() => Task)
  async updateConstTask(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('taskInput') taskInput: ConstTaskInput
  ) {
    const task = await Task.findOne({
      where: { id },
    });

    if (!task) {
      throw new Error('Task not found');
    }
    if (task.user.id !== user?.id) {
      throw new Error('Task does not belong to user');
    }

    const result = await this.tasksService.updateConstTask(user, id, taskInput);
    return result;
  }

  @Mutation(() => Task)
  async updateFloatTask(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('taskInput') taskInput: FloatTaskInput
  ) {
    const task = await Task.findOne({
      where: { id },
    });

    if (!task) {
      throw new Error('Task not found');
    }
    if (task.user.id !== user?.id) {
      throw new Error('Task does not belong to user');
    }

    const result = await this.tasksService.updateFloatTask(user, id, taskInput);
    return result;
  }

  @Mutation(() => Task)
  async removeTask(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number
  ) {
    const task = await Task.findOne({
      where: { id },
    });

    if (!task) {
      throw new Error('Task not found');
    }
    if (task.user.id !== user?.id) {
      throw new Error('Task does not belong to user');
    }

    return this.tasksService.remove(user, id);
  }
}
