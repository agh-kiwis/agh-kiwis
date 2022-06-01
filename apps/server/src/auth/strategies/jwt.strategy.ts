import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

type JwtPayload = Pick<User, 'id'> & { iat: number; exp: number };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      // TODO THIS IS NOT WORKING!!!
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: configService.get('auth.secret'),
    });
  }

  public validate(payload: JwtPayload) {
    console.log('Hello there!');
    const user = this.authService.validateJwtPayload(payload);
    if (!user) {
      // TODO Customize this exception
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    }

    return user;
  }
}
