import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

// Add more fields that can be updated here
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
}
