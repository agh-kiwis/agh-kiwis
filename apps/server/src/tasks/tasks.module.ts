import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ChunkInfo } from './entities/chunkInfo.entity';
import { Color } from '../categories/entities/color.entity';
import { Priority } from './entities/priority.entity';
import { TaskBreakdown } from './entities/taskBreakdown.entity';
import { Repeat } from './entities/repeat.entity';
import { Notification } from './entities/notification.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Task,
      ChunkInfo,
      Color,
      Notification,
      Priority,
      TaskBreakdown,
      Repeat,
    ]),
  ],

  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
