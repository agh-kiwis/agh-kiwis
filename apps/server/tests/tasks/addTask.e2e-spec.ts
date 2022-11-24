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
        ConstTaskInput: {
          category: { newCategory: { colorId: 1, name: "Some name" } }
          chillTime: "P3Y6M4DT12H30M5S"
          duration: "00::00"
          name: "Walk a dog"
          start: "2022-11-19 12:00:00"
          repeat: {
            repeatEvery: 1
            repeatType: DAYS
            repeatUntil: "2022-11-21 12:00:00"
          }
          priority: "high"
        }
      ) {
        chunkInfo {
          # Shared fields
          start
          chillTime
          # Const fields
          repeat {
            repeatEvery
            repeatType
            repeatUntil
          }
          duration
          # Float fields
          minChunkDuration
          maxChunkDuration
          estimation
          deadline
        }
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
          duration: 'P0D',
          maxChunkDuration: null,
          deadline: null,
          estimation: null,
          repeat: {
            repeatEvery: 1,
            repeatType: 'Days',
            repeatUntil: '2022-11-21T11:00:00.000Z',
          },
          minChunkDuration: null,
          start: '2022-11-19T11:00:00.000Z',
        },
        isDone: false,
        isFloat: false,
        name: 'Walk a dog',
        notifications: null,
        priority: 'high',
        shouldAutoResolve: false,
        chunks: [
          {
            duration: 'P0D',
            isDone: false,
            start: '2022-11-19T11:00:00.000Z',
          },
          {
            duration: 'P0D',
            isDone: false,
            start: '2022-11-20T11:00:00.000Z',
          },
          {
            duration: 'P0D',
            isDone: false,
            start: '2022-11-21T11:00:00.000Z',
          },
        ],
      });
    });
  });
});
