import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterOptions {
  @Field({ nullable: true })
  isDone?: boolean;

  @Field({ nullable: true })
  isFloat?: boolean;

  @Field(() => [Number], { nullable: true })
  category?: number[];

  @Field(() => [String], { nullable: true })
  priority?: string[];

  @Field({ nullable: true })
  repeat?: boolean;
}
