import { registerAs } from '@nestjs/config';
import { getEnvVarWithThrow } from '../utils/raiseIfEmpty';

export default registerAs('app', () => ({
  // This is the crucial part of production/development distinction. It can be either development, test or production mode.
  nodeEnv: getEnvVarWithThrow('NODE_ENV'),
  production: process.env.NODE_ENV === 'production',
  name: process.env.APP_NAME,
  // Graphql Sandbox vs Apollo Studio (choose the best fit for your use and set it in .env)
  sandbox: process.env.ENABLE_GRAPHQL_SANDBOX === 'true',
  workingDirectory: process.env.PWD || process.cwd(),
  frontendDomain: getEnvVarWithThrow('FRONTEND_DOMAIN'),
  backendDomain: process.env.NEXT_PUBLIC_BACKEND_DOMAIN,
  port: parseInt(process.env.BACKEND_PORT, 10) || 3000,
  apiPrefix: process.env.NEXT_PUBLIC_API_PREFIX || 'graphql',
  // Indicates whether we need to seed the database with initial data before the server starts.
  seedDatabase: process.env.APP_SEED_DATABASE != 'false' || false,
  // needs to be set to frontend domain in production, can be * in development.
  // As we are including credentials via cookies, we can't allow
  // CORS to be set to * by Chrome. So it needs to be our frontend domain.
  corsOrigin: getEnvVarWithThrow('FRONTEND_DOMAIN'),
}));
