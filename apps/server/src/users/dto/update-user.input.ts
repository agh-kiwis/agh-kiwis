import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { NullableField } from '../../utils/NullableField';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;

  @NullableField(() => String)
  name: string;

  @NullableField(() => Date)
  birthDate: Date;

  @NullableField(() => Boolean)
  hasCompletedIntroduction: boolean;
}
