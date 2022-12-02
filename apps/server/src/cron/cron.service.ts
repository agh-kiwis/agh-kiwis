import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Chunk } from '../tasks/entities/chunk.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_MINUTE)
  async markTasksAsDone() {
    const tasks: Task[] = await Task.find({
      relations: ['chunks', 'chunkInfo'],
      where: {
        shouldAutoResolve: true,
      },
    });

    tasks.map((task) => {
      if (task.isFloat) {
        if (this.isPastDeadline(task)) {
          // mark task as done (and it's corresponding chunks)
          Task.update(task.id, {
            isDone: true,
          });
          task.chunks.map((chunk) => {
            Chunk.update(chunk.id, {
              isDone: true,
            });
          });
        } else {
          // mark specific chunks as done
          task.chunks.map((chunk) => {
            Chunk.update(chunk.id, {
              isDone: this.isChunkEnded(chunk),
            });
          });
        }
      } else if (task.chunkInfo.repeat) {
        // mark specific chunks as done
        task.chunks.map((chunk) => {
          Chunk.update(chunk.id, {
            isDone: this.isChunkEnded(chunk),
          });
        });
      } else if (this.isConstTaskEnded(task)) {
        // mark task as done (and it's corresponding chunks)
        Task.update(task.id, {
          isDone: true,
        });
        task.chunks.map((chunk) => {
          Chunk.update(chunk.id, {
            isDone: this.isChunkEnded(chunk),
          });
        });
      }
    });
  }

  private isPastDeadline(task: Task): boolean {
    return moment(task.chunkInfo.deadline).isBefore(moment());
  }

  private isConstTaskEnded(task: Task): boolean {
    return moment(task.chunkInfo.start)
      .add(task.chunkInfo.duration)
      .isBefore(moment());
  }

  private isChunkEnded(chunk: Chunk): boolean {
    return moment(chunk.start).add(chunk.duration).isBefore(moment());
  }
}
