import { Duration } from 'moment';
import { Field, InputType } from '@nestjs/graphql';
import { Interval } from '../../utils/interval.scalar';
import { ChunkInfoInput } from './chunkInfo.input';
import { CreateTaskInput } from './createTask.input';


// TODO Add some custom validators
@InputType()
export class CreateFloatTaskInput extends CreateTaskInput {
  @Field(() => ChunkInfoInput)
  chunkInfo: ChunkInfoInput;

  @Field(() => Date)
  deadline: Date;

  @Field()
  start: Date;

  @Field(() => Interval)
  minTimeBetweenChunks: Duration;

  @Field(() => Interval, { nullable: true })
  minChunkDuration: Duration;

  @Field(() => Interval)
  maxChunkDuration: Duration;
}