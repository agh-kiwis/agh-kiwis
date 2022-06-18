import { Field, InputType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';
import { Interval } from '../../utils/interval.scalar';
import { CreateTaskInput } from './createTask.input';

@InputType()
export class CreateConstTaskInput extends CreateTaskInput {
  @Field(() => Interval)
  duration: IPostgresInterval;
}
