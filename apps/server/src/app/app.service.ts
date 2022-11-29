import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req:any) {
    if (!req.user) {
      return 'No user from google';
    }

    console.log(req);
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
