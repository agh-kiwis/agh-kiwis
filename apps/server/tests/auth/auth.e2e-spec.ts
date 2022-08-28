import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app/app.module';
import connection from '../connection';

describe('Auth (e2e)', () => {
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
            'mutation {register(registerDto: {email: "email@gmail.com",password: "password1234"}) {email}}',
        })
        .expect(200)
        .expect((res: any) => {
          expect(res.body.data.register).toEqual({
            email: 'email@gmail.com',
          });
        });
    });
  });
});
