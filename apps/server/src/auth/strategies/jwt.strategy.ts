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
      // This is vulnerable to XSRF attacks, instead of setting a cookie we need to set a header, and get JWT Token from header itself
      jwtFromRequest: extractJwtFromCookie(
        configService.get('auth.cookie_name')
      ),
      secretOrKey: configService.get('auth.secret'),
    });
  }

  public validate(payload: JwtPayload) {
    const user = this.authService.validateJwtPayload(payload);
    if (!user) {
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    }

    return user;
  }
}
