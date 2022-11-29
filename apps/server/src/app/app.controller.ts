import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../auth/strategies/public.strategy';
import { AppService } from './app.service';


@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @Public()
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }
}