import { Field, InputType, Int } from '@nestjs/graphql';

// TODO Add descriptions
@InputType()
export class TaskFilterOptions {
  @Field(() => [Int], {
    nullable: true,
    description:
      'Get only those tasks with id from the list. Is not applied when value is null. When list is empty - returns empty tasks list.',
  })
  ids: number[];

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
