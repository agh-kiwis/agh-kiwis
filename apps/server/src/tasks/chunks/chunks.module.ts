import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '../../ordering/order.service';
import { PaginationService } from '../../pagination/pagination.service';
import { Chunk } from './chunk.entity';
import { ChunksResolver } from './chunks.resolver';
import { ChunksService } from './chunks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chunk])],

  providers: [ChunksResolver, ChunksService, OrderService, PaginationService],
})
export class ChunksModule {}
