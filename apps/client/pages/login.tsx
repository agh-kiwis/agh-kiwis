import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Button, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import { useLoginMutation } from '@agh-kiwis/data-access';
import { CredentialSchema } from '@agh-kiwis/form-validators';
import {
  AlertModal,
  CommonButton,
  GoogleButton,
  InputField,
  Logo,
  Wrapper,
} from '@agh-kiwis/ui-components';
import { ERROR_MODAL_TIMEOUT } from '@agh-kiwis/workspace-constants';

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState('');
  const [loginMutation] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (values, { setErrors }) => {
    const response = await loginMutation({
      variables: {
        loginDto: {
          email: values.email,
          password: values.password,
        },
      },
    }).catch((caughtError) => {
      setLoginError('Wrong email or password!');
      setTimeout(() => {
        setLoginError('');
      }, ERROR_MODAL_TIMEOUT);
    });
    if (response) {
      console.log(response.data.login.token);
      // Set authorization cookie to response token (if we are working at different domains and it's not set automatically)
      // cookieCutter.set('authorization', response.data.login.token);
      router.push('/');
    }
  };

  return (
    <Wrapper>
      <Logo />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validateOnChange={false}
        validationSchema={CredentialSchema}
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
                <Button variant="link" size={'sm'}>
                  Forgot password?
                </Button>
              </NextLink>
            </Flex>

            {loginError && (
              <Box mt={4} mb={6}>
                <AlertModal
                  status={'error'}
                  title={'Login failed!'}
                  message={loginError}
                />
              </Box>
            )}

            <VStack mt={4} spacing={4}>
              <CommonButton
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                buttonText="Sign in"
              />
              <GoogleButton buttonText="Continue with Google" />
            </VStack>
            <Flex justify={'space-around'} align={'center'} my={6}>
              <Divider mx={4} />
              <Text fontSize="sm" color="gray.300">
                OR
              </Text>
              <Divider mx={4} />
            </Flex>
            <NextLink href="/register" passHref>
              <Button variant="outline" w="100%">
                Sign up
              </Button>
            </NextLink>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
