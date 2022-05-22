import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthEmailLoginInput {
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsExist, ['User'], {
    message: 'emailNotExists',
  })
  @Field()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
