import { In, LessThan, MoreThan } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OrderOptions } from '../../ordering/order.options';
import { OrderService } from '../../ordering/order.service';
import { PaginationOptions } from '../../pagination/pagination.options';
import { PaginationService } from '../../pagination/pagination.service';
import { User } from '../../users/entities/user.entity';
import { ChunkFilterOptions } from '../dto/chunkFilter.options';
import { Task } from '../entities/task.entity';
import { Chunk } from './chunk.entity';

@Injectable()
export class ChunksService {
  constructor(
    private readonly orderService: OrderService,
    private readonly paginationService: PaginationService
  ) {}

  async resolveChunks(
    user: User,
    chunkFilterOptions: ChunkFilterOptions,
    paginationOptions: PaginationOptions,
    orderOptions: OrderOptions
  ) {
    // Create query builder from chunk entity
    let queryBuilder = Chunk.createQueryBuilder('chunk')
      // Decide how we display and limit chunks in time??
      // Use filter options to filter chunks
      // Left join tasks and select only user id from there
      .leftJoin('chunk.task', 'task')
      .where({
        ...(chunkFilterOptions?.taskIds && {
          task: { id: In(chunkFilterOptions.taskIds) },
        }),

        ...(chunkFilterOptions.chunkStartAfter && {
          start: MoreThan(chunkFilterOptions.chunkStartAfter),
        }),
        ...(chunkFilterOptions.chunkEndBefore && {
          // TODO This is not working as expected
          // As we're not adding duration to the start
          start: LessThan(chunkFilterOptions.chunkEndBefore),
        }),
      })
      .andWhere('task.userId = :userId', { userId: user.id });

    queryBuilder = this.orderService.order(orderOptions, queryBuilder);

    queryBuilder = this.paginationService.paginate(
      paginationOptions,
      queryBuilder
    );

    return await queryBuilder.getMany();
  }

  async resolveTask(chunk: Chunk) {
    // TODO Batch later on
    // Create repository builder from chunk
    return await Task.createQueryBuilder('task')
      .leftJoin('task.chunks', 'chunk')
      .innerJoinAndSelect('task.chunkInfo', 'chunkInfo')
      .where('chunk.id = :chunkId', { chunkId: chunk.id })
      .getOneOrFail();
  }
}
