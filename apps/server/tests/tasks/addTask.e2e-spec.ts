import gql from 'graphql-tag';
import { describe_e2e, execute } from '../tests';


describe_e2e('Tasks (e2e)', () => {
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
          start: "2022-11-19T11:00:00.000Z"
          repeat: {
            repeatEvery: 1
            repeatType: DAYS
            repeatUntil: "2022-11-21T11:00:00.000Z"
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
        chunks(orderOptions: { field: "start", desc: false }) {
          duration
          isDone
          start
        }
      }
    }
  `;

  describe('task', () => {
    it('AddTask', async () => {
      const { register } = await execute(registerMutation, {
        registerDto: {
          email: 'email@gmail.com',
          password: 'password1234',
        },
      });

      const { addConstTask } = await execute(addConstTaskMutation, {
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
            duration: 'P0Y0M0DT0H0M0S',
            isDone: false,
            start: '2022-11-19T11:00:00.000Z',
          },
          {
            duration: 'P0Y0M0DT0H0M0S',
            isDone: false,
            start: '2022-11-20T11:00:00.000Z',
          },
          {
            duration: 'P0Y0M0DT0H0M0S',
            isDone: false,
            start: '2022-11-21T11:00:00.000Z',
          },
        ],
      });
    });
  });
});