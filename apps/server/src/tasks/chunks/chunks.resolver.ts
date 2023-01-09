import {
  GraphqlLoader,
  Loader,
  LoaderData
} from '@agh-kiwis/nestjs-graphql-tools';
import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderOptions } from '../../ordering/order.options';
import { PaginationOptions } from '../../pagination/pagination.options';
import { CurrentUser } from '../../providers/user.provider';
import { User } from '../../users/entities/user.entity';
import { ChunkFilterOptions } from '../dto/chunkFilter.options';
import { Task } from '../entities/task.entity';
import { Chunk } from './chunk.entity';
import { ChunksService } from './chunks.service';

@Resolver(() => Chunk)
export class ChunksResolver {
  constructor(private readonly chunksService: ChunksService) {}

  @Query(() => [Chunk])
  async chunks(
    @CurrentUser() user: User,
    // TODO Replace that with custom argument later on
    @Args('chunkFilterOptions', { nullable: true })
    chunkFilterOptions: ChunkFilterOptions,
    @Args('paginationOptions', { defaultValue: {} })
    paginationOptions: PaginationOptions,
    @Args('orderOptions', { defaultValue: {} })
    orderOptions: OrderOptions
  ) {
    return this.chunksService.resolveChunks(
      user,
      chunkFilterOptions,
      paginationOptions,
      orderOptions
    );
  }

  @ResolveField(() => Task, { name: 'task' })
  @GraphqlLoader({
    accessor: (parent: Chunk) => parent.task.id,
  })
  async task(@Loader() loader: LoaderData<Task, number>) {
    const tasks = await this.chunksService.resolveTask(loader.ids);

    return loader.helpers.mapManyToOneRelation(tasks, loader.ids);
  }
}
