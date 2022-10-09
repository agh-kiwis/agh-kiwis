import { Field, InputType } from '@nestjs/graphql';
import { Duration } from 'moment';
import { Interval } from '../../utils/interval.scalar';

@InputType()
// TODO Add validation library to validate those timings (in lib folder, set of constructs and functions)
export class ChunkInfoInput {
  @Field(() => Interval)
  minTimeBetweenChunks: Duration;

  @Field(() => Interval)
  minChunkDuration: Duration;

  @Field(() => Interval)
  maxChunkDuration: Duration;
}
