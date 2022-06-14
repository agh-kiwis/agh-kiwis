import { Field, InputType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';

@InputType()
export class ChunkInfoInput {
  @Field(() => String)
  minTimeBetweenChunks: IPostgresInterval;

  @Field(() => String)
  minChunkDuration: IPostgresInterval;

  @Field(() => String)
  maxChunkDuration: IPostgresInterval;
}
