import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';

@InputType()
export class UpdateTaskInput extends PartialType(Task) {
  @Field(() => Int)
  id: number;
}
