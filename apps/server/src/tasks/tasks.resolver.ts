import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContextRequest } from '../types/context.type';
import { CreateConstTaskInput } from './dto/createConstTask.input';
import { CreateFloatTaskInput } from './dto/createFloatTask.input';
import { GetTasksInput } from './dto/getTasks.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  addConstTask(
    @Context('req') contextRequest: ContextRequest,
    @Args('createConstTaskInput') CreateConstTaskInput: CreateConstTaskInput
  ) {
    return this.tasksService.createConst(
      contextRequest.user,
      CreateConstTaskInput
    );
  }

  @Mutation(() => Task)
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
  getTasks(
    @Context('req') contextRequest: ContextRequest,
    @Args('getTasksInput') getTasksInput: GetTasksInput
  ) {
    return this.tasksService.getTasks(contextRequest.user, getTasksInput);
  }

  @Query(() => Task)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.remove(id);
  }
}
