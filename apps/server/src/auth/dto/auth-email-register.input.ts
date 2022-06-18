import { IsEmail, Length, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthEmailRegisterInput {
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'Email already exists',
  })
  @IsEmail()
  @Field()
  email: string;

  @Length(6, 50)
  @Field()
  password: string;
}
