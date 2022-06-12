import { Field, InputType } from '@nestjs/graphql';
import { RepeatInput } from './repeat.input';
import { IPostgresInterval } from 'postgres-interval';

// TODO Add Custom Validators
@InputType()
export class CreateTaskInput {
  @Field()
  name: string;
  @Field()
  start: Date;

  @Field(() => String)
  chillTime: IPostgresInterval;
  @Field({ nullable: true })
  shouldAutoResolve: boolean;
  @Field()
  categoryId: number;
  @Field(() => RepeatInput)
  repeat: RepeatInput;
  @Field(() => String, { nullable: true })
  timeBeforeNotification: IPostgresInterval;
  // TODO Default this closer to database
  @Field({ nullable: true })
  priorityId: number;
}

@InputType()
export class CreateConstTaskInput extends CreateTaskInput {
  @Field(() => String)
  duration: IPostgresInterval;
}
