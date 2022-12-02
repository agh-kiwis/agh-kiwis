import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chunk } from '../tasks/entities/chunk.entity';
import { ChunkInfo } from '../tasks/entities/chunkInfo.entity';
import { Task } from '../tasks/entities/task.entity';
import { CronService } from './cron.service';

@Module({
  imports: [
    // initializes the scheduler and registers any declarative cron jobs, timeouts and intervals
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Task, ChunkInfo, Chunk]),
  ],
  providers: [CronService],
})
export class CronModule {}
