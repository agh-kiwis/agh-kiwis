import { Field, InputType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';
import { ChunkInfoInput } from './chunkInfo.input';
import { CreateTaskInput } from './createConstTask.input';

// TODO Add some custom validators
@InputType()
export class CreateFloatTaskInput extends CreateTaskInput {
  @Field(() => ChunkInfoInput)
  chunkInfo: ChunkInfoInput;

  @Field(() => String)
  estimation: IPostgresInterval;
}
