import gql from 'graphql-tag';
import { User } from '../../src/users/entities/user.entity';
import { describe_e2e, execute } from '../tests';


const EMAIL = 'email@gmail.com';
const PASSWORD = 'password1234';

// We can override this describe to be describe_e2e
describe_e2e('Auth (e2e)', () => {

  const registerMutation = gql`
    mutation ($registerDto: AuthEmailRegisterInput!) {
      register(registerDto: $registerDto) {
        email
      }
    }
  `;

  it('register', async () => {
    // makeRequest needs to have a wrapper from the above that adds an app
    const { register } = await execute(registerMutation, {
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

    const { login } = await execute(loginMutation, {
      loginDto: {
        email: EMAIL,
        password: PASSWORD,
      },
    });

    expect(login.email).toBe(EMAIL);
  });
});