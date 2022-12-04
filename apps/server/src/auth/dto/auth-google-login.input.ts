import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthGoogleLoginInput {
  @Field()
  credential: string;
}
