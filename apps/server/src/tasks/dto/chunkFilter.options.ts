import { Field, InputType, Int } from '@nestjs/graphql';

// TODO Add descriptions
@InputType()
export class ChunkFilterOptions {
  @Field(() => [Int], {
    nullable: true,
  })
  taskIds: number[];

  @Field(() => Date, {
    nullable: true,
  })
  chunkStartAfter: Date;

  @Field(() => Date, {
    nullable: true,
  })
  chunkEndBefore: Date;
}
