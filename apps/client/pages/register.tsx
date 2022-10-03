import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Button, VStack } from '@chakra-ui/react';
import { useRegisterMutation } from '@agh-kiwis/data-access';
import { CredentialSchema } from '@agh-kiwis/form-validators';
import {
  AlertModal,
  CommonButton,
  InputField,
  Logo,
  SectionDivider,
  Wrapper,
} from '@agh-kiwis/ui-components';
import { ERROR_MODAL_TIMEOUT } from '@agh-kiwis/workspace-constants';

const Register: React.FC = () => {
  const [loginError, setLoginError] = useState('');
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();

  const onSubmit = async (values, { setErrors }) => {
    const response = await registerMutation({
      variables: {
        registerDto: {
          email: values.email,
          password: values.password,
        },
      },
    }).catch((caughtError) => {
      setLoginError('User with given email is already registered!');
      setTimeout(() => {
        setLoginError('');
      }, ERROR_MODAL_TIMEOUT);
    });
    if (response) {
      router.push('/login');
    }
  };

  return (
    <Wrapper variant="small">
      <Logo />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validateOnChange={false}
        validationSchema={CredentialSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="Email" label="Email" />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>

            {loginError && (
              <Box mt={4} mb={6}>
                <AlertModal
                  status={'error'}
                  title={'Sign up failed!'}
                  message={loginError}
                />
              </Box>
            )}

            <VStack mt={4} spacing={4}>
              <CommonButton
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                buttonText="Sign Up"
              />
            </VStack>
            <SectionDivider />
            <NextLink href="/login" passHref>
              <Button variant="outline" w={'100%'}>
                Sign in
              </Button>
            </NextLink>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
