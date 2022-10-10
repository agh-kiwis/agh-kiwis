import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import connection from '../connection';

// TODO Seems that those tests are interfering with each other

describe.only('addTasks (e2e)', () => {
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

  const addConstTaskMutation = () => `
    mutation {
      addConstTask(CreateConstTaskInput: {
        category: {
          newCategory:{
            colorId: 1,
            name: "Some name"
          }},
        chillTime: "P3Y6M4DT12H30M5S",
        duration: "00::00",
        name: "Walk a dog",
        start: "2017-08-19 12:17:55 -0400",
        repeat:{
          repeatEvery: 1,
          repeatType:DAYS,
          startFrom: "2017-06-01"
        },    
        priorityId: 17
      }){
          
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
        priority {
          id
          name
        }
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

  describe('addConstTask', () => {
    it('register', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: addConstTaskMutation(),
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
