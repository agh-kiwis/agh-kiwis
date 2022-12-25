import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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

  // TODO Add task as a field of a chunk and resolve it (maybe with shared resolvers)

  @Query(() => [Chunk])
  async chunks(
    @CurrentUser() user: User,
    // TODO Replace that with custom argument later on
    @Args('chunkFilterOptions') chunkFilterOptions: ChunkFilterOptions,
    @Args('paginationOptions', { defaultValue: {} })
    paginationOptions: PaginationOptions,
    @Args('orderOptions', { defaultValue: {} }) orderOptions: OrderOptions
  ) {
    console.log('Jo jo ');
    return this.chunksService.resolveChunks(
      user,
      chunkFilterOptions,
      paginationOptions,
      orderOptions
    );
  }

  @ResolveField(() => Task, { name: 'task' })
  async task(@Parent() chunk: Chunk) {
    return this.chunksService.resolveTask(chunk);
  }
}
