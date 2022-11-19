import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../providers/user.provider';
import { User } from '../users/entities/user.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';
import { Color } from './entities/color.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Mutation(() => Category)
  createCategory(
    @CurrentUser() user: User,
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ) {
    return this.categoriesService.create(user, createCategoryInput);
  }

  @Query(() => [Category])
  findCategoryByPrefix(
    @CurrentUser() user: User,
    @Args('prefix') prefix: string
  ) {
    return this.categoriesService.findByPrefix(user, prefix);
  }

  @Query(() => [Color])
  getColors(@CurrentUser() user: User) {
    return this.categoriesService.getColors(user);
  }

  @Query(() => [Category])
  getCategories(@CurrentUser() user: User) {
    return this.categoriesService.getCategories(user);
  }

  @Mutation(() => Category)
  removeCategory(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.categoriesService.remove(user, id);
  }
}
