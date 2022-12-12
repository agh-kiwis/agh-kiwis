// /test/connection.ts
import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';

// Make this a class with an app inside
const connection = {
  async create(app: INestApplication) {
    const dataSource = app.get(DataSource);
    await dataSource.initialize();
    return dataSource;
    // create connection with default configuration
  },

  async close(app: INestApplication) {
    const dataSource = app.get(DataSource);
    await dataSource.destroy();
  },

  async clear(app: INestApplication) {
    const dataSource = app.get(DataSource);

    const entities = dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
  },
};
export default connection;
