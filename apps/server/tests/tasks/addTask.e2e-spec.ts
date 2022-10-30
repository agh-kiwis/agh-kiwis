import gql from 'graphql-tag';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import { User } from '../../src/users/entities/user.entity';
import connection from '../connection';
import { makeRequest } from '../testUtils';

// TODO Seems that those tests are interfering with each other

describe.only('addTasks (e2e)', () => {
  // Add address to the type

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

  const loginMutation = gql`
    mutation {
      login(loginDto: { email: "email@gmail.com", password: "password1234" }) {
        id
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
        chillTime
        chunkInfo {
          id
          maxChunkDuration
          minChunkDuration
          minTimeBetweenChunks
        }
        deadline
        estimation
        id
        isDone
        isFloat
        name
        notifications {
          timeBefore
        }
        priority
        shouldAutoResolve
        taskBreakdowns {
          duration
          isDone
          repeat {
            repeatEvery
            repeatType
            startFrom
          }
          start
        }
      }
    }
  `;

  describe('task', () => {
    it('AddTask', async () => {
      //   Add user with email email@gmail.com
      await User.create({
        email: 'email@gmail.com',
        password: 'password1234',
      }).save();

      const { login } = await makeRequest(app, loginMutation);

      const { addConstTask } = await makeRequest(app, addConstTaskMutation, {
        token: login.token,
      });

      // Assert that to
      expect(addConstTask).toEqual({
        chillTime: 'P3Y6M4DT12H30M5S',
        chunkInfo: null,
        deadline: null,
        estimation: null,
        id: 1,
        isDone: false,
        isFloat: false,
        name: 'Walk a dog',
        notifications: null,
        priority: 'high',
        shouldAutoResolve: false,
        taskBreakdowns: null,
      });
    });
  });
});
