import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Button, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from '@agh-kiwis/data-access';
import { CredentialSchema } from '@agh-kiwis/form-validators';
import {
  AlertModal,
  CommonButton,
  InputField,
  Logo,
  Wrapper,
} from '@agh-kiwis/ui-components';
import { ERROR_MODAL_TIMEOUT } from '@agh-kiwis/workspace-constants';

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState('');
  const [popUpMessage, setPopUpMessage] = useState('');
  const [loginMutation] = useLoginMutation({
    update(cache) {
      cache.evict({ fieldName: 'tasks' });
      cache.evict({ fieldName: 'chunks' });
      cache.evict({ fieldName: 'me' });
      cache.gc();
    },
  });
  const [googleLoginMutation] = useGoogleLoginMutation();
  const router = useRouter();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setTimeout(() => {
        setPopUpMessage('');
      }, ERROR_MODAL_TIMEOUT);
    }
  }, [popUpMessage]);

  const onSubmit = async (values: { email: string; password: string }) => {
    const response = await loginMutation({
      variables: {
        loginDto: {
          email: values.email,
          password: values.password,
        },
      },
    }).catch((caughtError) => {
      if (caughtError.message.includes('Invalid login credentials')) {
        // TODO This needs to be in utils with some stage handling in useEffects
        setLoginError(caughtError.message);
        setTimeout(() => {
          setLoginError('');
        }, ERROR_MODAL_TIMEOUT);
      } else {
        setPopUpMessage(caughtError.message);
      }
    });
    if (response) {
      response.data.login.introductionCompleted
        ? router.push('/todo-list')
        : router.push('/introduction/user-details');
    }
  };

  const onSuccessGoogleLogin = async (credentialResponse: {
    credential: string;
  }) => {
    const response = await googleLoginMutation({
      variables: {
        googleLoginDto: {
          credential: credentialResponse.credential,
        },
      },
    }).catch((caughtError) => {
      setLoginError('Wrong email or password!');
      setTimeout(() => {
        setLoginError('');
      }, ERROR_MODAL_TIMEOUT);
    });
    if (response) {
      response.data.googleLogin.introductionCompleted
        ? router.push('/')
        : router.push('/introduction/user-details');
    }
  };
  const onFailureGoogleLogin = async () => {
    setLoginError('Unsuccessful login via google!');

    return setTimeout(() => {
      setLoginError('');
    }, ERROR_MODAL_TIMEOUT);
  };

  return (
    <Wrapper>
      {popUpMessage && (
        <Box
          position="absolute"
          mt="1"
          left="50%"
          transform="translateX(-50%)"
          height="fit-content"
          width={['66vw', '400px']}
        >
          <AlertModal
            status={'error'}
            title={'Error!'}
            message={popUpMessage}
          />
        </Box>
      )}
      <Logo />

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={CredentialSchema}
      >
        {({ touched, isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                touched={!!touched.email}
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                touched={!!touched.password}
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

              <GoogleLogin
                // TODO Set googleLoginButton width the same as common button width
                size="large"
                shape="pill"
                onSuccess={onSuccessGoogleLogin}
                onError={onFailureGoogleLogin}
              />
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
