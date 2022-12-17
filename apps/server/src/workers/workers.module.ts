import { Module } from '@nestjs/common';
import { TaskPlanner } from './taskPlanner';

@Module({
  imports: [],
  providers: [TaskPlanner],
  exports: [TaskPlanner],
})
export class WorkersModule {}
