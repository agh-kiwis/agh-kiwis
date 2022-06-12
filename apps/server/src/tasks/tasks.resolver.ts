import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContextRequest } from '../types/context.type';
import { CreateConstTaskInput } from './dto/createConstTask.input';
import { CreateFloatTaskInput } from './dto/createFloatTask.input';
import { GetTasksInput } from './dto/getTask.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  addConstTask(
    @Context('req') contextRequest: ContextRequest,
    @Args('CreateConstTaskInput') CreateConstTaskInput: CreateConstTaskInput
  ) {
    return this.tasksService.createConst(
      contextRequest.user,
      CreateConstTaskInput
    );
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  addFloatTask(
    @Context('req') contextRequest: ContextRequest,
    @Args('createFloatTaskInput') createFloatTaskInput: CreateFloatTaskInput
  ) {
    return this.tasksService.createFloatTask(
      contextRequest.user,
      createFloatTaskInput
    );
  }

  @Query(() => [Task])
  @UseGuards(JwtAuthGuard)
  getTasks(
    @Context('req') contextRequest: ContextRequest,
    @Args('getTasksInput') getTasksInput: GetTasksInput
  ) {
    return this.tasksService.getTasks(contextRequest.user, getTasksInput);
  }

  @Query(() => Task)
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.remove(id);
  }
}
