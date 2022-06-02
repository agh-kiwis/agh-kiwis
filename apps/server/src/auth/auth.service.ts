import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ContextType } from '../types/context.type';
import { JwtTokenPayload } from '../types/jwt-token.type';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthProvidersEnum } from './auth-providers.enum';
import { AuthEmailLoginInput } from './dto/auth-email-login.input';
import { AuthEmailRegisterInput } from './dto/auth-email-register.input';

// This is vulnerable to XSRF attacks, instead of setting a cookie we need to set an
// HTTP Authorization header, from the side of client, and store this in cookies
// But we will ignore it by now
const setCookie = (
  token: string,
  context: ContextType,
  configService: ConfigService
) => {
  context.res.cookie(configService.get('auth.cookie_name'), token, {
    maxAge: configService.get('auth.cookie_refresh_duration'),
    domain: configService.get('auth.cookie_domain'),
    // This header prevents extracting cookie from client's browser third-party script
    httpOnly: configService.get('app.production'),
    secure: configService.get('app.production'),
  });
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
    context: ContextType,
    loginInput: AuthEmailLoginInput
  ): Promise<User> {
    const user = await this.usersService.findOne({
      email: loginInput.email,
    });

    if (user.provider !== AuthProvidersEnum.email) {
      // TODO Add our own error handling
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: `needLoginViaProvider:${user.provider}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginInput.password,
      user.password
    );

    if (isValidPassword) {
      const tokenObject: JwtTokenPayload = {
        id: user.id,
      };
      const token = this.jwtService.sign(tokenObject);
      setCookie(token, context, this.configService);

      return user;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }

  async register(
    context: ContextType,
    registerInput: AuthEmailRegisterInput
  ): Promise<User> {
    const user = await this.usersService.create({
      ...registerInput,
      email: registerInput.email,
    });

    const tokenObject: JwtTokenPayload = {
      id: user.id,
    };

    const token = this.jwtService.sign(tokenObject);

    setCookie(token, context, this.configService);

    return user;
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }

  async validateJwtPayload(
    payload: JwtTokenPayload
  ): Promise<User | undefined> {
    // This will be used when the user has already logged in and has a JWT
    console.log(payload);
    const user = await this.usersService.findOne({ id: +payload.id });

    // Ensure the user exists and their account isn't disabled
    if (user && user.isEnabled) {
      return user;
    }

    return undefined;
  }

  me(context: any): User {
    return context.user;
  }
}
