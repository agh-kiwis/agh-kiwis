import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContextRequest } from '../types/context.type';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Mutation(() => Category)
  createCategory(
    @Context('req') contextRequest: ContextRequest,
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ) {
    return this.categoriesService.create(
      contextRequest.user,
      createCategoryInput
    );
  }

  @Query(() => [Category])
  findCategoryByPrefix(
    @Context('req') contextRequest: ContextRequest,
    @Args('prefix') prefix: string
  ) {
    return this.categoriesService.findByPrefix(contextRequest.user, prefix);
  }

  @Mutation(() => Category)
  updateCategory(
    @Context('req') contextRequest: ContextRequest,

    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ) {
    return this.categoriesService.update(
      contextRequest.user,
      updateCategoryInput.id,
      updateCategoryInput
    );
  }

  @Mutation(() => Category)
  removeCategory(
    @Context('req') contextRequest: ContextRequest,
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.categoriesService.remove(contextRequest.user, id);
  }
}
