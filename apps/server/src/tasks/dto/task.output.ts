import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';

@ObjectType()
export class TaskOutput extends Task {
  @Field()
  chunksDone: number;
}
