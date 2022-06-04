import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthResponse extends User {
  @Field({ nullable: true })
  // For now we are ignoring this field in frontend, and setting token in cookies from server
  token?: string;
}
