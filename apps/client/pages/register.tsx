import { useRegisterMutation } from '@agh-kiwis/data-access';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';
// TODO Change this to something supporting TS
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { InputField } from '../components/Login/InputField';
import { Wrapper } from '../components/Login/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';

const Register = () => {
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
      router.push('/');
    }
  };

  return (
    <Wrapper variant="small">
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
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
              Register
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

export default Register;
