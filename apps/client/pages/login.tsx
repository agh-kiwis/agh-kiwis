import { useLoginMutation } from '@agh-kiwis/data-access';
import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { InputField } from '../components/Login/InputField';
import { Wrapper } from '../components/Login/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';

const Login = () => {
  const [loginMutation] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await loginMutation({
            variables: {
              loginDto: {
                email: values.email,
                password: values.password,
              },
            },
          }).catch((caughtError) => {
            setErrors(toErrorMap(caughtError));
          });
          if (response) {
            // Handle response somehow
            console.log(response.data.login.token);
            // Set authorization cookie to response token
            // cookieCutter.set('authorization', response.data.login.token);

            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="email" placeholder="Email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex justify={'right'} mt={1}>
              <NextLink href="/forgot-password" passHref>
                <Button colorScheme="green" variant="link" size={'sm'}>
                  Forgot password?
                </Button>
              </NextLink>
            </Flex>
            <Button
              colorScheme="green"
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              w={'100%'}
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
