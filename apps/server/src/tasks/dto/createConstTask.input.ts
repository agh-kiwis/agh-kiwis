import { Field, InputType } from '@nestjs/graphql';
import { Duration } from 'moment';
import { Interval } from '../../utils/interval.scalar';
import { CreateTaskInput } from './createTask.input';

@InputType()
export class CreateConstTaskInput extends CreateTaskInput {
  @Field(() => Interval)
  duration: Duration;
}
