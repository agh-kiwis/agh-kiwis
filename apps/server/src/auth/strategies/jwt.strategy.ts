import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
import { extractJwtFromCookie } from '../../utils/extract-jwt-from-cookie';
import { AuthService } from '../auth.service';

type JwtPayload = Pick<User, 'id'> & { iat: number; exp: number };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      // This function should accept the request as a first argument, and return
      // token if it is present or null

      // This is vulnerable to XSRF attacks, instead of setting a cookie we need to set a header, and get JWT Token from header itself
      // jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
      jwtFromRequest: extractJwtFromCookie(
        configService.get('auth.cookie_name')
      ),
      secretOrKey: configService.get('auth.secret'),
    });
  }

  public validate(payload: JwtPayload) {
    const user = this.authService.validateJwtPayload(payload);
    console.log('Hello there!!! ' + user);
    if (!user) {
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    }

    return user;
  }
}
