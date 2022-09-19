import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Box, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRegisterMutation } from '@agh-kiwis/data-access';
import { toErrorMap } from '../utils/toErrorMap';
import {
  CommonButton,
  InputField,
  Logo,
  SectionDivider,
  Wrapper,
} from '@agh-kiwis/ui-components';

const Register: React.FC = () => {
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
      console.log(caughtError.graphQLErrors);
      setErrors(toErrorMap(caughtError));
    });
    if (response) {
      // Handle response somehow
      router.push('/login');
    }
  };

  return (
    <Wrapper variant="small">
      <Logo />
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
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
