import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';

@InputType()
// TODO For now this duplicates auth inputs, should be changed
export class CreateUserInput {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  @Field()
  email: string | null;

  @Field()
  @MinLength(6)
  password?: string;
}
