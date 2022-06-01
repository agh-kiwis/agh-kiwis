import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../users/dto/user.response';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthEmailLoginInput } from './dto/auth-email-login.input';

import { ContextType } from '../types/context.type';
import { AuthEmailRegisterInput } from './dto/auth-email-register.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class AuthResolver {
  constructor(public service: AuthService) {}

  @Mutation(() => User)
  public async login(
    // TODO Add types to context
    @Context() context: ContextType,
    @Args('loginDto') loginDto: AuthEmailLoginInput
  ) {
    return this.service.login(context, loginDto);
  }

  @Mutation(() => User)
  async register(
    @Context() context: ContextType,
    @Args('registerDto') registerDto: AuthEmailRegisterInput
  ) {
    return this.service.register(context, registerDto);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@Context('req') request: any) {
    return this.service.me(request);
  }
}
