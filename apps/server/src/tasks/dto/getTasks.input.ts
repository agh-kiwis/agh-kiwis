import { Field, InputType } from '@nestjs/graphql';
import { PaginatedInput } from '../../utils/PaginatedInput';

@InputType()
export class FilterOptions {
  @Field({ nullable: true })
  isDone?: boolean;

  @Field({ nullable: true })
  isFloat?: boolean;

  @Field({ nullable: true })
  category?: number;

  @Field({ nullable: true })
  priority?: string;

  //TODO Uncomment below when back-end resolver will be ready
  // @Field((type) => [Number], { nullable: true })
  // category?: number[];

  // @Field((type) => [String], { nullable: true })
  // priority?: string;
}

@InputType()
export class GetTasksInput extends PaginatedInput {
  @Field(() => FilterOptions, { nullable: true })
  filterOptions?: FilterOptions;
}
