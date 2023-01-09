import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  GraphqlLoader,
  Loader,
  LoaderData,
} from '@agh-kiwis/nestjs-graphql-tools';
import { Category } from '../categories/entities/category.entity';
import { OrderOptions } from '../ordering/order.options';
import { PaginationOptions } from '../pagination/pagination.options';
import { CurrentUser } from '../providers/user.provider';
import { Notification } from '../tasks/entities/notification.entity';
import { User } from '../users/entities/user.entity';
import { Chunk } from './chunks/chunk.entity';
import { ChunkInput } from './dto/chunkInput';
import { ConstTaskInput } from './dto/constTask.input';
import { FloatTaskInput } from './dto/floatTask.input';
import { TaskInput } from './dto/task.input';
import { TaskFilterOptions } from './dto/taskFilter.options';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  // FIELDS

  @ResolveField(() => [Chunk], { name: 'chunks' })
  @GraphqlLoader()
  async chunksFieldResolver(
    // FIXME
    // THAT IS PROBABLY A nestjs/graphql BUG,
    // because paginatedOptions need to be seeded with
    // default values at this point, but seems that they are not
    @Loader() loader: LoaderData<Chunk[], number>,
    @Args('paginationOptions', { defaultValue: { offset: 0, limit: 20 } })
    paginationOptions: PaginationOptions,
    @Args('orderOptions', { defaultValue: { field: 'id', desc: true } })
    orderOptions: OrderOptions
  ) {
    const chunks = await this.tasksService.chunksFieldResolve(
      loader.ids,
      paginationOptions,
      orderOptions
    );
    // TODO We would like to move that to another place
    const taskChunksMap = loader.ids.reduce((acc, id) => {
      acc[Number(id)] = [];
      chunks.forEach((chunk) => {
        if (chunk.task.id === id) {
          acc[Number(id)].push(chunk);
        }
      });
      return acc;
    }, {});

    return loader.ids.reduce((acc: number[], id) => {
      acc.push(taskChunksMap[id]);
      return acc;
    }, []);
  }

  @ResolveField(() => Notification)
  @GraphqlLoader()
  async notificationsFieldResolver(
    // FIXME
    @Loader() loader: LoaderData<Category, number>
  ) {
    // We need to move that to the helper
    const tasksWithCategories =
      await this.tasksService.resolveNotificationsField(loader.ids);

    const taskNotificationsMap = loader.ids.reduce((acc, id) => {
      acc[Number(id)] = [];

      tasksWithCategories.forEach((task) => {
        if (task.id === id) {
          acc[Number(id)] = task.notifications;
        }
      });
      return acc;
    }, {});

    return loader.ids.reduce((acc: number[], id) => {
      acc.push(taskNotificationsMap[id]);
      return acc;
    }, []);
  }

  // QUERIES
  @Query(() => [Task])
  async tasks(
    @CurrentUser() user: User,
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

  // MUTATIONS

  @Mutation(() => Task)
  addConstTask(
    @CurrentUser() user: User,
    // TODO Fix this arg name to be starting from lowercase
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
    return this.tasksService.update(id, taskInput);
  }

  @Mutation(() => Task)
  async updateConstTask(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('taskInput') taskInput: ConstTaskInput
  ) {
    const task = await Task.findOne({
      where: { id: id },
    });

    if (!task) {
      throw new Error('Task not found');
    }
    if (task.user.id !== user?.id) {
      throw new Error('Task does not belong to user');
    }

    return this.tasksService.updateConstTask(user, id, taskInput);
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

    return this.tasksService.updateFloatTask(user, id, taskInput);
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
    return this.tasksService.updateChunk(id, chunkInput);
  }

  @Mutation(() => Task)
  async removeTask(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number
  ) {
    // Move those validations to the service
    // Resolver is only responsible for validating the input
    // And authorizing the request
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
