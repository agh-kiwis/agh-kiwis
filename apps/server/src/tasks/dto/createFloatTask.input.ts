import { Field, InputType } from '@nestjs/graphql';
import { Duration } from 'moment';
import { Interval } from '../../utils/interval.scalar';
import { ChunkInfoInput } from './chunkInfo.input';
import { CreateTaskInput } from './createTask.input';

// TODO Add some custom validators
@InputType()
export class CreateFloatTaskInput extends CreateTaskInput {
  @Field(() => ChunkInfoInput)
  chunkInfo: ChunkInfoInput;

  @Field(() => Interval)
  estimation: Duration;

  @Field(() => String)
  deadline: Date;

  @Field()
  start: Date;
}
