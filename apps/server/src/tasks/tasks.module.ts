import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Task } from './entities/task.entity';
import { ChunkInfo } from './entities/chunkInfo.entity';
import { Color } from './entities/color.entity';
import { Priority } from './entities/priority.entity';
import { TaskBreakdown } from './entities/taskBreakdown.entity';
import { Repeat } from './entities/repeat.entity';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
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
