import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContextRequest, CustomContext } from '../types/context.type';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthEmailLoginInput } from './dto/auth-email-login.input';
import { AuthEmailRegisterInput } from './dto/auth-email-register.input';
import { AuthResponse } from './dto/auth.response';
import { Public } from './strategies/public.strategy';

@Resolver(() => User)
export class AuthResolver {
  constructor(public service: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  public async login(
    @Context() context: CustomContext,
    @Args('loginDto') loginDto: AuthEmailLoginInput
  ) {
    return this.service.login(context, loginDto);
  }

  @Mutation(() => Boolean)
  public async logout(@Context() context: CustomContext) {
    return this.service.logout(context);
  }

  @Public()
  @Mutation(() => AuthResponse)
  async register(
    @Context() context: CustomContext,
    @Args('registerDto') registerDto: AuthEmailRegisterInput
  ) {
    return this.service.register(context, registerDto);
  }

  @Query(() => User)
  async me(@Context('req') contextRequest: ContextRequest) {
    return this.service.me(contextRequest);
  }
}
