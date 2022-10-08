import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from '../providers/user.provider';
import { ForbiddenError } from 'apollo-server-errors';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ) {
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
    // There we need to check if given user can perform given action
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number
  ) {
      if (user.id !== id) {
      throw new ForbiddenError('You can only update your own user');
    }
    // There we need to check if given user can perform given action
    return await this.usersService.softDelete(id);
  }

  // TODO Resolve me

}
