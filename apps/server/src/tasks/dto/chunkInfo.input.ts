import { Field, InputType } from '@nestjs/graphql';
import { Duration } from 'moment';
import { Interval } from '../../utils/interval.scalar';

@InputType()
// TODO Add validation (maybe add validation lib to use there and in frontend)
export class ChunkInfoInput {
  @Field(() => Interval)
  minTimeBetweenChunks: Duration;

  @Field(() => Interval)
  minChunkDuration: Duration;

  @Field(() => Interval)
  maxChunkDuration: Duration;
}
