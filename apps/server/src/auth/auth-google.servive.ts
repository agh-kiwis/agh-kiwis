import { OAuth2Client } from 'google-auth-library';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomContext } from '../types/context.type';
import { JwtTokenPayload } from '../types/jwt-token.type';
import { User } from '../users/entities/user.entity';
import { setCookie } from '../utils/cookies-handler';
import { AuthGoogleLoginInput } from './dto/auth-google-login.input';
import { AuthResponse } from './dto/auth.response';

interface GoogleUser {
  email: string;
  name: string;
}

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;

  constructor(
    // TODO Move this to a config service later on
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.google = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
  }

  async getProfileByToken(token: string): Promise<GoogleUser> {
    const ticket = await this.google.verifyIdToken({
      idToken: token,
      audience: [process.env.GOOGLE_CLIENT_ID],
    });

    console.log(ticket);

    const data = ticket.getPayload();

    return {
      email: data.email,
      name: data.given_name + ' ' + data.family_name,
    };
  }

  async googleLogin(context: CustomContext, loginDto: AuthGoogleLoginInput) {
    //   This works under the assumption that the user provided by google is valid
    //   To make this **really** secure we should generate a request token before google sign-in and validate it here
    const profile = await this.getProfileByToken(loginDto.credential);

    if (!profile) {
      throw new Error('Invalid token');
    }

    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        email: profile.email,
        name: profile.name,
        provider: 'google',
      }).save();
    }

    const tokenObject: JwtTokenPayload = {
      id: user.id,
    };

    const token = this.jwtService.sign(tokenObject);
    setCookie(token, context, this.configService);

    return { ...user, token } as AuthResponse;
  }
}
