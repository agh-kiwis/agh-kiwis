import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  cookie_refresh_duration: process.env.REFRESH_COOKIE_DURATION,
  cookie_domain: process.env.COOKIE_DOMAIN,
  cookie_name: process.env.AUTH_COOKIE_NAME || 'authorization',
}));
