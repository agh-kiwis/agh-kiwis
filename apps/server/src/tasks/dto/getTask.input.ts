import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { PaginatedInput } from '../../utils/PaginatedInput';

@InputType()
export class FilterOptions {
  @Field()
  isDone: boolean;
}

@InputType()
export class GetTasksInput extends PaginatedInput {
  @Field(() => FilterOptions)
  filterOptions: FilterOptions;
}
