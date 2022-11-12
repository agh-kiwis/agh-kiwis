import { registerAs } from '@nestjs/config';
import { getEnvVarWithThrow } from '../utils/raiseIfEmpty';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  type: getEnvVarWithThrow('DATABASE_TYPE'),
  host: getEnvVarWithThrow('DATABASE_HOST'),
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  password: getEnvVarWithThrow('DATABASE_PASSWORD'),
  name: process.env.DATABASE_NAME || 'agh_kiwis',
  username: getEnvVarWithThrow('DATABASE_USERNAME'),
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
  sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
  // That is related to the layer between you and the database if
  // Somebody has your login details. We can safely omit that for now.
  rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',

  // Those are secure options to be set on production, when deploying postgres app.
  ca: process.env.DATABASE_CA,
  key: process.env.DATABASE_KEY,
  cert: process.env.DATABASE_CERT,
  dropSchema: process.env.DATABASE_DROP_SCHEMA === 'true',
}));
