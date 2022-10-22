import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../providers/user.provider';
import { User } from '../users/entities/user.entity';
import { CreateConstTaskInput } from './dto/createConstTask.input';
import { CreateFloatTaskInput } from './dto/createFloatTask.input';
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
    @Args('createConstTaskInput') CreateConstTaskInput: CreateConstTaskInput
  ) {
    return this.tasksService.createConst(user, CreateConstTaskInput);
  }

  @Mutation(() => Task)
  addFloatTask(
    @CurrentUser() user: User,
    @Args('createFloatTaskInput') createFloatTaskInput: CreateFloatTaskInput
  ) {
    return this.tasksService.createFloatTask(user, createFloatTaskInput);
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
    @Args('taskInput') taskInput: TaskInput
  ) {
    const task = await Task.findOne(taskInput.id);

    if (!task) {
      throw new Error('Task not found');
    }
    if ((await task.user).id !== user?.id) {
      throw new Error('Task does not belong to user');
    }

    const result = await this.tasksService.update(taskInput);
    return result;
  }

  @Mutation(() => Task)
  async removeTask(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number
  ) {
    const task = await Task.findOne(id);

    if (!task) {
      throw new Error('Task not found');
    }
    if ((await task.user).id !== user?.id) {
      throw new Error('Task does not belong to user');
    }

    return this.tasksService.remove(user, id);
  }
}
