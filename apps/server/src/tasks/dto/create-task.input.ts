import { Field, InputType } from '@nestjs/graphql';
import { RepeatInput } from './repeat.input';
import { IPostgresInterval } from 'postgres-interval';

// TODO Add some custom validators
@InputType()
export class CreateConstTaskInput {
  @Field()
  name: string;
  @Field()
  start: Date;
  @Field(() => String)
  duration: IPostgresInterval;
  @Field(() => String)
  chillTime: IPostgresInterval;
  @Field({ nullable: true })
  shouldAutoResolve: boolean;
  @Field()
  categoryId: number;
  @Field(() => RepeatInput)
  repeat: RepeatInput;
  // @Field({ nullable: true })
  // notificationId: number;
}
