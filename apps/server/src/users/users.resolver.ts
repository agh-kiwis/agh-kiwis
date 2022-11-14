import { ForbiddenError } from 'apollo-server-errors';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../providers/user.provider';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    if (user.id !== updateUserInput.id) {
      throw new ForbiddenError('You can only update your own user');
    }
    return this.usersService.update(user, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number
  ) {
    if (user.id !== id) {
      throw new ForbiddenError('You can only update your own user');
    }
    return await this.usersService.softDelete(id);
  }
}
