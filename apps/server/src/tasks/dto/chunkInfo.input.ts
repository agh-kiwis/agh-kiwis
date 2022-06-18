import { Field, InputType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';
import { Interval } from '../../utils/interval.scalar';

@InputType()
// TODO Add validation (maybe add validation lib to use there and in frontend)
export class ChunkInfoInput {
  @Field(() => Interval)
  minTimeBetweenChunks: IPostgresInterval;

  @Field(() => Interval)
  minChunkDuration: IPostgresInterval;

  @Field(() => Interval)
  maxChunkDuration: IPostgresInterval;
}
