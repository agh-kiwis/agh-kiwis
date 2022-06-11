import { useLoginMutation } from '@agh-kiwis/data-access';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { InputField } from '../components/Login/InputField';
import { Wrapper } from '../components/Login/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';

const Login = () => {
  const [loginMutation] = useLoginMutation();
  const router = useRouter();

  const onFormSubmit = async (values, { setErrors }) => {
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
      // Set authorization cookie to response token (if we are working at different domains and it's not set automatically)
      // cookieCutter.set('authorization', response.data.login.token);
      router.push('/');
    }
  };

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="Email" />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting}>
              Login
            </Button>
            <NextLink href="/forgot-password" passHref>
              <Box mr={2} mt={2}>
                <Link>Forgot password?</Link>
              </Box>
            </NextLink>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
