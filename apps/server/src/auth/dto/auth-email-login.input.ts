import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthEmailLoginInput {
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsExist, ['User'], {
    message: "Email doesn't exist",
  })
  @Field()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Field()
  password: string;
}
