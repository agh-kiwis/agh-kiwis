// import dotenv
import { parse } from 'dotenv';
import { readFileSync } from 'fs';

const envConfig = parse(readFileSync('apps/server/tests/.env'));
for (var k in envConfig) {
  process.env[k] = envConfig[k];
}
