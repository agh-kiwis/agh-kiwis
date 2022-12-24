import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrderOptions } from '../ordering/order.options';
import { PaginationOptions } from '../pagination/pagination.options';
import { CurrentUser } from '../providers/user.provider';
import { User } from '../users/entities/user.entity';
import { ChunkFilterOptions } from './dto/chunkFilter.options';
import { ChunkInput } from './dto/chunkInput';
import { ConstTaskInput } from './dto/constTask.input';
import { FloatTaskInput } from './dto/floatTask.input';
import { GetTasksInput } from './dto/getTasks.input';
import { TaskInput } from './dto/task.input';
import { TaskFilterOptions } from './dto/taskFilter.options';
import { Chunk } from './entities/chunk.entity';
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
  async tasks(
    @CurrentUser() user: User,
    // Make the filter options optional
    @Args('taskFilterOptions', { nullable: true })
    taskFilterOptions: TaskFilterOptions,
    @Args('paginationOptions', { defaultValue: {} })
    paginationOptions: PaginationOptions,
    @Args('orderOptions', { defaultValue: {} }) orderOptions: OrderOptions
  ) {
    return this.tasksService.tasks(
      user,
      taskFilterOptions,
      paginationOptions,
      orderOptions
    );
  }

  @ResolveField(() => [Chunk], { name: 'chunks' })
  async chunksFieldResolver(
    @Parent() task: Task,
    @Args('paginationOptions', { defaultValue: {} })
    paginationOptions: PaginationOptions,
    @Args('orderOptions', { defaultValue: {} }) orderOptions: OrderOptions
  ) {
    // TODO Later on we need to introduce dataloader there
    // Link to the implementation in resolver function
    // A chunk is expected to be a field of a task, so we omit validation
    return this.tasksService.chunksFieldResolve(
      task,
      paginationOptions,
      orderOptions
    );
  }

  // TODO Add task as a field of a chunk and resolve it (maybe with shared resolvers)

  @Query(() => [Chunk], { name: 'chunks' })
  async chunksResolver(
    @CurrentUser() user: User,
    @Args('chunkFilterOptions') chunkFilterOptions: ChunkFilterOptions,
    @Args('paginationOptions', { defaultValue: {} })
    paginationOptions: PaginationOptions,
    @Args('orderOptions', { defaultValue: {} }) orderOptions: OrderOptions
  ) {
    return this.tasksService.chunksResolver(
      user,
      chunkFilterOptions,
      paginationOptions,
      orderOptions
    );
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

  @Mutation(() => Chunk)
  async updateChunk(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('chunkInput') chunkInput: ChunkInput
  ) {
    const chunk = await Chunk.findOne({
      relations: {
        task: {
          user: true,
        },
      },
      where: { id },
    });
    if (!chunk) {
      throw new Error('Chunk not found');
    }
    if (chunk.task.user.id !== user.id) {
      throw new Error('Task does not belong to user');
    }
    const result = await this.tasksService.updateChunk(id, chunkInput);
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
