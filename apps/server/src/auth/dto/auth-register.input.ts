import { IsEmail, MinLength, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class AuthRegisterDto {
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
