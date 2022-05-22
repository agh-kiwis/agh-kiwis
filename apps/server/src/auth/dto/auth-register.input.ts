import { IsEmail, MinLength, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthRegisterDto {
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
