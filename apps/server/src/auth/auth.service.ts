import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Context } from '../types/context.type';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthProvidersEnum } from './auth-providers.enum';
import { AuthEmailLoginInput } from './dto/auth-email-login.input';
import { AuthRegisterDto } from './dto/auth-register.input';
import { AuthUserResponse } from './dto/auth-user.response';

const setCookie = (
  token: string,
  context: Context,
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
    context: Context,
    loginDto: AuthEmailLoginInput
  ): Promise<AuthUserResponse> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
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
      loginDto.password,
      user.password
    );

    if (isValidPassword) {
      const token = this.jwtService.sign({
        id: user.id,
      });
      setCookie(token, context, this.configService);

      // TODO Change response type & add error handling
      return { response: { token: token, name: user.name } };
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
    context: Context,
    dto: AuthRegisterDto
  ): Promise<AuthUserResponse> {
    const user = await this.usersService.create({
      ...dto,
      email: dto.email,
    });
    const token = this.jwtService.sign({
      id: user.id,
    });
    setCookie(token, context, this.configService);

    return { response: { token: token, name: user.name } };
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }
}
