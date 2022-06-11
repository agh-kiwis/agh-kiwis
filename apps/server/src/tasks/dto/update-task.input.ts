import { CreateConstTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateConstTaskInput) {
  @Field(() => Int)
  id: number;
}
