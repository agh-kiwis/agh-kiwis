import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Color } from '../categories/entities/color.entity';
import { OrderService } from '../ordering/order.service';
import { PaginationService } from '../pagination/pagination.service';
import { TaskPlanner } from '../workers/taskPlanner';
import { Chunk } from './entities/chunk.entity';
import { ChunkInfo } from './entities/chunkInfo.entity';
import { Notification } from './entities/notification.entity';
import { Repeat } from './entities/repeat.entity';
import { Task } from './entities/task.entity';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Task,
      ChunkInfo,
      Color,
      Notification,
      Chunk,
      Repeat,
    ]),
  ],

  providers: [
    TasksResolver,
    TasksService,
    TaskPlanner,
    OrderService,
    PaginationService,
  ],
})
export class TasksModule {}
