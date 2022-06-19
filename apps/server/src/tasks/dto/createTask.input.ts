import { InputType, Field } from '@nestjs/graphql';
import { Interval } from '../../utils/interval.scalar';
import { RepeatInput } from './repeat.input';
import { CategoryInput } from './category.input';
import { Duration } from 'moment';

// TODO Add Validation
@InputType()
export class CreateTaskInput {
  @Field()
  name: string;
  @Field()
  start: Date;
  @Field(() => Interval)
  chillTime: Duration;
  @Field({ nullable: true })
  shouldAutoResolve: boolean;
  @Field(() => CategoryInput)
  category: CategoryInput;
  @Field(() => RepeatInput)
  repeat: RepeatInput;
  @Field(() => Interval, { nullable: true })
  timeBeforeNotification: Duration;
  // TODO There always need to be a priority in the database for this to work
  @Field({ nullable: true, defaultValue: 1 })
  priorityId: number;
}
