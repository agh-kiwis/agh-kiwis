import { useEffect, useRef, useState } from 'react';
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
  const [popUpMessage, setPopUpMessage] = useState('');
  const [loginMutation] = useLoginMutation();
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
      }
      setPopUpMessage(caughtError.message);
    });
    if (response) {
      response.data.login.introductionCompleted
        ? router.push('/')
        : router.push('/introduction/user-details');
    }
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
