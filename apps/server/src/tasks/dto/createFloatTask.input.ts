import { Field, InputType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';
import { ChunkInfo } from '../entities/chunkInfo.entity';
import { CreateTaskInput } from './createConstTask.input';

// TODO Add some custom validators
@InputType()
export class CreateFloatTaskInput extends CreateTaskInput {
  @Field(() => ChunkInfo)
  chunkInfo: ChunkInfo;

  @Field(() => String)
  estimation: IPostgresInterval;
}
