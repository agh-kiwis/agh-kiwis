import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ContextRequest, CustomContext } from '../types/context.type';
import { JwtTokenPayload } from '../types/jwt-token.type';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthProvidersEnum } from './auth-providers.enum';
import { AuthEmailLoginInput } from './dto/auth-email-login.input';
import { AuthEmailRegisterInput } from './dto/auth-email-register.input';
import { AuthResponse } from './dto/auth.response';
import { ForbiddenError, UserInputError } from 'apollo-server-errors';

const setCookie = (
  token: string,
  context: CustomContext,
  configService: ConfigService
) => {
  context.res.cookie(configService.get('auth.cookie_name'), token, {
    maxAge: configService.get('auth.cookie_refresh_duration'),
    domain: configService.get('auth.cookie_domain'),
    // This header prevents extracting cookie from client's browser by third-party script
    httpOnly: configService.get('app.production'),
    secure: configService.get('app.production'),
  });
};

const clearCookie = (context: CustomContext, configService: ConfigService) => {
  context.res.clearCookie(configService.get('auth.cookie_name'));
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    // This is done to avoid circular dependencies
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) {}

  async login(
    context: CustomContext,
    loginInput: AuthEmailLoginInput
  ): Promise<AuthResponse> {
    const user = await this.usersService.findOne({
      email: loginInput.email,
    });

    if (user.provider !== AuthProvidersEnum.email) {
      // Apollo exceptions: https://www.apollographql.com/docs/apollo-server/data/errors/
      throw new ForbiddenError('Invalid login provider');
    }

    const isValidPassword = await bcrypt.compare(
      loginInput.password,
      user.password
    );

    if (!isValidPassword) {
      throw new UserInputError('Invalid login credentials');
    }

    const tokenObject: JwtTokenPayload = {
      id: user.id,
    };
    const token = this.jwtService.sign(tokenObject);
    setCookie(token, context, this.configService);

    return { ...user, token } as AuthResponse;
  }

  logout(context: CustomContext): boolean {
    // This is a temporary solution, we can't invalidate the JWT tokens
    // We need to use normal session tokens, which we would just remove from the key-value database (redis for example)
    clearCookie(context, this.configService);
    return true;
  }

  async register(
    context: CustomContext,
    registerInput: AuthEmailRegisterInput
  ): Promise<AuthResponse> {
    const user = await this.usersService.create({
      ...registerInput,
      email: registerInput.email,
    });

    const tokenObject: JwtTokenPayload = {
      id: user.id,
    };

    const token = this.jwtService.sign(tokenObject);

    setCookie(token, context, this.configService);

    return { ...user, token } as AuthResponse;
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }

  async validateJwtPayload(
    payload: JwtTokenPayload
  ): Promise<User | undefined> {
    // This will be used when the user has already logged in and has a JWT token to validate

    // + is an unary operator, which converts value to a number
    const user = await this.usersService.findOne({ id: +payload.id });

    // Ensure the user exists and their account isn't disabled
    if (user && user.isEnabled) {
      return user;
    }

    return undefined;
  }

  me(contextRequest: ContextRequest): User {
    return contextRequest.user;
  }
}
