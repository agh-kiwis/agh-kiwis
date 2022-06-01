import { IsEmail, MinLength, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
// TODO make this type a subtype of AuthLoginInput or vice-versa
export class AuthEmailRegisterInput {
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  @Field()
  email: string;

  @MinLength(6)
  @Field()
  password: string;
}
