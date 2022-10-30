import { assertWrappingType } from 'graphql';
import gql from 'graphql-tag';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import connection from '../connection';
import { makeRequest } from '../testUtils';


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

  const registerMutation = gql`
    mutation ($registerDto: AuthEmailRegisterInput!) {
      register(registerDto: $registerDto) {
        email
      }
    }
  `;

  describe('auth', () => {
    it('register', async () => {
      const { register } = await makeRequest(app, registerMutation, {
        registerDto: {
          email: 'email@gmail.com',
          password: 'password1234',
        },
      });

      expect(register.email).toBe('email@gmail.com');
    });
  });
});