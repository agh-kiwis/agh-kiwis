// /test/connection.ts
import { createConnection, getConnection } from 'typeorm';
// TODO this needs to be moved to utils (probably)
const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const entities = getConnection().entityMetadatas;
    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
  },
};
export default connection;
