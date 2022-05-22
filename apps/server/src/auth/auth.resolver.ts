import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../users/dto/user.response';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthEmailLoginInput } from './dto/auth-email-login.input';
import { AuthRegisterDto } from './dto/auth-register.input';
import { AuthUserResponse } from './dto/auth-user.response';

@Resolver(() => User)
export class AuthResolver {
  constructor(public service: AuthService) {}

  @Mutation(() => AuthUserResponse)
  public async login(
    // TODO Add types to context
    @Context() context,
    @Args('loginDto') loginDto: AuthEmailLoginInput
  ) {
    return this.service.login(context, loginDto);
  }

  @Mutation(() => AuthUserResponse)
  async register(
    @Context() context,
    @Args('createUserDto') createUserDto: AuthRegisterDto
  ) {
    return this.service.register(context, createUserDto);
  }
}
