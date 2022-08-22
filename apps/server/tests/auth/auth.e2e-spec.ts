/* eslint-disable @typescript-eslint/no-explicit-any */
// /test/customer.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { AppModule } from '../../src/app/app.module';
import connection from '../connection';

// TODO Need to fix jest config / db & env variables

describe('CustomerResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await connection.clear();
    await app.init();
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  const gql = '/graphql';

  describe('auth', () => {
    it('register', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            'mutation {register(registerDto: {email: "email@gmail.com",password: "password1234"}) {birthDate}}',
        })
        .expect(200)
        .expect((res: any) => {
          expect(res.body.data.register).toEqual({
            name: 'John Doe',
            email: 'email@gmail.com',
            gender: 'nul',
          });
        });
    });
  });
});
