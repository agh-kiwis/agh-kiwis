import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class PaginatedInput {
  @Field(() => Int)
  @Min(0)
  offset = 0;

  @Field(() => Int)
  @Min(1)
  @Max(30)
  //How many items to return per page
  limit = 10;
}
