import { parse } from 'dotenv';
import { readFileSync } from 'fs';

// TODO This needs to be replaced with some better approach
if (process.env.NODE_ENV === 'development') {
  const envConfig = parse(readFileSync('apps/server/tests/.env'));
  for (var k in envConfig) {
    process.env[k] = envConfig[k];
  }
}
