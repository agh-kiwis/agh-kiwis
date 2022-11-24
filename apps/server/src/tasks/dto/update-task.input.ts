import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';

@InputType()
export class UpdateTaskInput extends PartialType(Task) {
  @Field(() => ID)
  id: number;
}
