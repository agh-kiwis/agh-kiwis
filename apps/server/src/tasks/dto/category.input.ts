import { Field, InputType } from '@nestjs/graphql';
import { CreateCategoryInput } from '../../categories/dto/create-category.input';

@InputType()
export class CategoryInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  @Field(() => CreateCategoryInput, { nullable: true })
  newCategory?: CreateCategoryInput;
}
