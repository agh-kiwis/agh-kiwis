import { Logger } from '@nestjs/common';
import { seedDatabase } from '../database/db-seeder';

export const setupApp = async () => {
  if (process.env.APP_SEED_DATABASE === 'true') {
    Logger.log('Seeding database');
    seedDatabase();
  }
};
