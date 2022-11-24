import { Duration } from 'moment';
import { Field, InputType } from '@nestjs/graphql';
import { NullableField } from '../../utils/NullableField';
import { Interval } from '../../utils/interval.scalar';
import { RepeatInput } from './repeat.input';
import { TaskInput } from './task.input';

@InputType()
export class ConstTaskInput extends TaskInput {
  @Field(() => Interval)
  duration: Duration;

  @NullableField(() => RepeatInput, { description: 'Repeat options.' })
  repeat?: RepeatInput;
}
