import gql from 'graphql-tag';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import { User } from '../../src/users/entities/user.entity';
import connection from '../connection';
import { makeRequest } from '../testUtils';

const EMAIL = 'email@gmail.com';
const PASSWORD = 'password1234';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await connection.clear(app);
  });

  afterAll(async () => {
    await connection.close(app);
    await app.close();
  });

  const registerMutation = gql`
    mutation ($registerDto: AuthEmailRegisterInput!) {
      register(registerDto: $registerDto) {
        email
      }
    }
  `;

    it('register', async () => {
      const { register } = await makeRequest(app, registerMutation, {
        registerDto: {
          email: EMAIL,
          password: PASSWORD,
        },
      });

      expect(register.email).toBe('email@gmail.com');
    });

    const loginMutation = gql`
      mutation ($loginDto: AuthEmailLoginInput!) {
        login(loginDto: $loginDto) {
          email
        }
      }
    `;

    it('login', async () => {
      await User.create({
        email: EMAIL,
        password: PASSWORD,
      }).save();

      const { login } = await makeRequest(app, loginMutation, {
        loginDto: {
          email: EMAIL,
          password: PASSWORD,
        },
      });

      expect(login.email).toBe(EMAIL);
    });
});
