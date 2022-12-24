import { Max, Min } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationOptions {
  @Field(() => Int)
  @Min(0)
  offset = 0;

  @Field(() => Int, {
    description: 'Max number of items to return. Max 30, default is 10',
  })
  @Min(1)
  @Max(30)
  limit = 10;
}
