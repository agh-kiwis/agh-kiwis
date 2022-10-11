import { registerAs } from '@nestjs/config';

// TODO Add description to params & default fallbacks
export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  production: process.env.NODE_ENV === 'production',
  name: process.env.APP_NAME,
  sandbox: process.env.ENABLE_SANDBOX === 'true',
  workingDirectory: process.env.PWD || process.cwd(),
  frontendDomain: process.env.FRONTEND_DOMAIN,
  backendDomain: process.env.BACKEND_DOMAIN,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  seedDatabase: process.env.APP_SEED_DATABASE != 'false' || false,
  corsOrigin: process.env.CORS_ORIGIN || '*',
}));
