import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, Length, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

// TODO We need to somehow catch validation errors to not be thrown
// But that is not important for now as it's just on the error log level
@InputType()
export class AuthEmailLoginInput {
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsExist, ['User'], {
    message: "Email doesn't exist",
  })
  @Field()
  @IsEmail()
  email: string;

  @Length(6, 50)
  @Field()
  password: string;
}
