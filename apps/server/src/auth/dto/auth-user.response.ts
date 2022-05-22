import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from '../../users/dto/user.response';

// TODO Make this global on the side of config
// To call new OurOwnError({ field: 'field', message: 'message' })
// And this error would be returned as a response
// Because now we would need to map this error messages to our types in frontend
@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class AuthUserResponse {
  @Field(() => UserDto, { nullable: true })
  response?: UserDto;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
