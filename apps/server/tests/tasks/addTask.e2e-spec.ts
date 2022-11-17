import gql from 'graphql-tag';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import connection from '../connection';
import { makeRequest } from '../testUtils';

describe('Tasks (e2e)', () => {
  let app: INestApplication | any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await connection.clear();
    await app.init();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  const registerMutation = gql`
    mutation ($registerDto: AuthEmailRegisterInput!) {
      register(registerDto: $registerDto) {
        token
      }
    }
  `;

  const addConstTaskMutation = gql`
    mutation {
      addConstTask(
        createConstTaskInput: {
          category: { newCategory: { colorId: 1, name: "Some name" } }
          chillTime: "P3Y6M4DT12H30M5S"
          duration: "00::00"
          name: "Walk a dog"
          start: "2017-08-19 12:17:55 -0400"
          repeat: { repeatEvery: 1, repeatType: DAYS, startFrom: "2017-06-01" }
          priority: "high"
        }
      ) {
        chunkInfo {
          chillTime
          maxChunkDuration
          deadline
          estimation
          minChunkDuration
        }
        id
        isDone
        isFloat
        name
        notifications {
          timeBefore
        }
        priority
        shouldAutoResolve
        chunks {
          duration
          isDone
          start
        }
      }
    }
  `;

  describe('task', () => {
    it('AddTask', async () => {
      const { register } = await makeRequest(app, registerMutation, {
        registerDto: {
          email: 'email@gmail.com',
          password: 'password1234',
        },
      });

      const { addConstTask } = await makeRequest(app, addConstTaskMutation, {
        token: register.token,
      });

      expect(addConstTask).toEqual({
        chunkInfo: {
          chillTime: 'P3Y6M4DT12H30M5S',
          maxChunkDuration: null,
          deadline: null,
          estimation: null,
          minChunkDuration: null,
        },
        id: 1,
        isDone: false,
        isFloat: false,
        name: 'Walk a dog',
        notifications: null,
        priority: 'high',
        shouldAutoResolve: false,
        chunks: null,
      });
    });
  });
});
