import { Field, InputType } from '@nestjs/graphql';
import { PaginatedInput } from '../../utils/PaginatedInput';

@InputType()
export class FilterOptions {
  @Field({ nullable: true })
  isDone?: boolean;

  @Field({ nullable: true })
  isFloat?: boolean;
}

@InputType()
export class GetTasksInput extends PaginatedInput {
  @Field(() => FilterOptions)
  filterOptions: FilterOptions;
}
