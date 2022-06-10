import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Box, Flex, Text, VStack, Divider } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useLoginMutation } from '@agh-kiwis/data-access';
import { CommonButton } from '../components/Common/CommonButton';
import { GoogleButton } from '../components/Common/GoogleButton';
import { InputField } from '../components/Login/InputField';
import { Wrapper } from '../components/Containers/Wrapper';
import { Logo } from '../components/Utils/Logo';
import { toErrorMap } from '../utils/toErrorMap';

const Login = () => {
  const [loginMutation] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <Logo />
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
              <Button variant="outline" colorScheme="green" w={'100%'}>
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