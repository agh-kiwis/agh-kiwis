import { Max, Min } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationOptions {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  offset: number = 0;

  @Field(() => Int, {
    description: 'Max number of items to return. Max 30, default is 10',
    defaultValue: 20,
  })
  @Min(1)
  @Max(50)
  limit: number = 20;
}
