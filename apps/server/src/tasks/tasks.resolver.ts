import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../providers/user.provider';
import { ContextRequest } from '../types/context.type';
import { User } from '../users/entities/user.entity';
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
    @CurrentUser() user: User,
    @Args('createConstTaskInput') CreateConstTaskInput: CreateConstTaskInput
  ) {
    return this.tasksService.createConst(
      user,
      CreateConstTaskInput
    );
  }

  @Mutation(() => Task)
  addFloatTask(
    @CurrentUser() user: User,
    @Args('createFloatTaskInput') createFloatTaskInput: CreateFloatTaskInput
  ) {
    return this.tasksService.createFloatTask(
      user,
      createFloatTaskInput
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
