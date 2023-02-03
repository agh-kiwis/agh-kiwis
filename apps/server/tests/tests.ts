import { DocumentNode } from 'graphql';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import connection from './connection';
import { makeRequest } from './testUtils';

let app: INestApplication;

export const describe_e2e = (
  name: string,
  fn: (app: INestApplication) => void,
  customBeforeEach = (app: INestApplication) => null,
  customBeforeAll = (app: INestApplication) => null
) => {
  describe(name, () => {
    setupTests(customBeforeEach, customBeforeAll);
    fn(app);
  });
};

const setupTests = (
  customBeforeEach: (app: INestApplication) => void,
  customBeforeAll: (app: INestApplication) => void
) => {
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    customBeforeAll(app);
  });

  beforeEach(async () => {
    await connection.clear(app);
    customBeforeEach(app);
  });

  afterAll(async () => {
    await connection.close(app);
    await app.close();
  });
};

export const execute = (query: DocumentNode, args: unknown) => {
  return makeRequest(app, query, args);
};
