import { Field, InputType } from '@nestjs/graphql';
import { RepeatInput } from './repeat.input';
import { IPostgresInterval } from 'postgres-interval';
import { Interval } from '../../utils/interval.scalar';

// TODO Add Custom Validators
@InputType()
export class CreateTaskInput {
  @Field()
  name: string;
  @Field()
  start: Date;

  @Field(() => Interval)
  chillTime: IPostgresInterval;
  @Field({ nullable: true })
  shouldAutoResolve: boolean;
  @Field()
  categoryId: number;
  @Field(() => RepeatInput)
  repeat: RepeatInput;
  @Field(() => Interval, { nullable: true })
  timeBeforeNotification: IPostgresInterval;
  // TODO Default this closer to database
  @Field({ nullable: true, defaultValue: 1 })
  priorityId: number;
}

@InputType()
export class CreateConstTaskInput extends CreateTaskInput {
  @Field(() => Interval)
  duration: IPostgresInterval;
}
