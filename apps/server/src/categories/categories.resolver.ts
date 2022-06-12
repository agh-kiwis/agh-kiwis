import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContextRequest } from '../types/context.type';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
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
  // TODO Change this to exclude unprotected rotes, not include
  @UseGuards(JwtAuthGuard)
  findCategoryByPrefix(
    @Context('req') contextRequest: ContextRequest,
    @Args('prefix') prefix: string
  ) {
    return this.categoriesService.findByPrefix(contextRequest.user, prefix);
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  removeCategory(
    @Context('req') contextRequest: ContextRequest,
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.categoriesService.remove(contextRequest.user, id);
  }
}
