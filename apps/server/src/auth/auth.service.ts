import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ContextType } from '../types/context.type';
import { JwtTokenType } from '../types/jwt-token.type';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthProvidersEnum } from './auth-providers.enum';
import { AuthEmailLoginInput } from './dto/auth-email-login.input';
import { AuthEmailRegisterInput } from './dto/auth-email-register.input';

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
      const tokenObject: JwtTokenType = {
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

    const tokenObject: JwtTokenType = {
      id: user.id,
    };

    const token = this.jwtService.sign(tokenObject);

    setCookie(token, context, this.configService);

    return user;
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }
}
