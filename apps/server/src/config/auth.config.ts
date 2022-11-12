import { registerAs } from '@nestjs/config';
import { extractDomainFromUrl } from '../utils/extractDomain';
import { getEnvVarWithThrow } from '../utils/raiseIfEmpty';


export default registerAs('auth', () => ({
  // This is used for jwt signing and verification.
  secret: getEnvVarWithThrow('AUTH_JWT_SECRET'),
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN || '1d',
  // Cookie is being set for that period of time. By default it's set to 1 day.
  cookie_refresh_duration: process.env.REFRESH_COOKIE_DURATION || '86400',
  cookie_domain: extractDomainFromUrl(process.env.NEXT_PUBLIC_BACKEND_DOMAIN),
  cookie_name: process.env.AUTH_COOKIE_NAME || 'authorization',
}));