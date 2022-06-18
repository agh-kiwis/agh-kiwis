import { seedDatabase } from '../database/db-seeder';

export const setupApp = async () => {
  if (process.env.APP_SEED_DATABASE === 'true') {
    console.log('Seeding database');
    seedDatabase();
  }
};
