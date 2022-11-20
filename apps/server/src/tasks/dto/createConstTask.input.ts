import { Duration } from 'moment';
import { Field, InputType } from '@nestjs/graphql';
import { Interval } from '../../utils/interval.scalar';
import { CreateTaskInput } from './createTask.input';
import { NullableField } from '../../utils/NullableField';
import { RepeatInput } from './repeat.input';

@InputType()
export class CreateConstTaskInput extends CreateTaskInput {
  @Field(() => Interval)
  duration: Duration;

  @NullableField(() => RepeatInput, { description: 'Repeat options.' })
  repeat?: RepeatInput;
}
