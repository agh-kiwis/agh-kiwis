import { Duration } from 'moment';
import { Field, InputType } from '@nestjs/graphql';
import { Interval } from '../../utils/interval.scalar';
import { TaskInput } from './task.input';

@InputType()
export class FloatTaskInput extends TaskInput {
  @Field(() => Interval)
  estimation: Duration;

  @Field(() => Date)
  deadline: Date;

  @Field(() => Interval, { nullable: true })
  minChunkDuration: Duration;

  @Field(() => Interval)
  maxChunkDuration: Duration;
}
