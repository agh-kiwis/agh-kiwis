import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthProvidersEnum } from './auth-providers.enum';
import { AuthEmailLoginInput } from './dto/auth-email-login.input';
import { AuthRegisterDto } from './dto/auth-register.input';
import { AuthUserResponse } from './dto/auth-user.response';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async login(
    context,
    loginDto: AuthEmailLoginInput
  ): Promise<AuthUserResponse> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (user.provider !== AuthProvidersEnum.email) {
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

    // TODO

    if (isValidPassword) {
      const token = this.jwtService.sign({
        id: user.id,
      });

      context.res.cookie('token', token, {
        // maxAge: REFRESH_COOKIE_DURATION,
        maxAge: 3.154e10,
        // domain: COOKIE_DOMAIN,
        domain: 'localhost',
        // Change this in prod
        httpOnly: true,
        // secure: !IS_LOCAL,
        secure: false,
      });

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

  async register(context, dto: AuthRegisterDto): Promise<AuthUserResponse> {
    const user = await this.usersService.create({
      ...dto,
      email: dto.email,
    });
    const token = this.jwtService.sign({
      id: user.id,
    });
    // TODO Extract this and put to env
    context.res.cookie('token', token, {
      // maxAge: REFRESH_COOKIE_DURATION,
      maxAge: 3.154e10,
      // domain: COOKIE_DOMAIN,
      domain: 'localhost',
      // Change this in prod
      httpOnly: true,
      // secure: !IS_LOCAL,
      secure: false,
    });

    return { response: { token: token, name: user.name } };
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }
}
