import { ConfigService } from '@nestjs/config';
import { CustomContext } from '../types/context.type';

// This won't work for different domains, so client need to set this cookie manually
export const setCookie = (
  token: string,
  context: CustomContext,
  configService: ConfigService
) => {
  console.log(configService.get('auth.cookie_domain'));
  context.res.cookie(configService.get('auth.cookie_name'), token, {
    maxAge: configService.get('auth.cookie_refresh_duration'),
    // domain: configService.get('auth.cookie_domain'),
    // This header prevents extracting cookie from client's browser by third-party script
    httpOnly: configService.get('app.production'),
    // THIS IS REALLY UNSAFE but isn't working without that
    // sameSite: 'None',
    // THIS IS REALLY WEIRD
    domain: configService.get('auth.cookie_domain'),
    secure: configService.get('app.production'),
    sameSite: configService.get('app.production') ? 'None' : 'Lax',
  });
};
export const clearCookie = (
  context: CustomContext,
  configService: ConfigService
) => {
  context.res.clearCookie(configService.get('auth.cookie_name'));
};
