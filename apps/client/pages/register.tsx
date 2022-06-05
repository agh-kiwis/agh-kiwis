import { useRegisterMutation } from '@agh-kiwis/data-access';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
// TODO Change this to something supporting TS
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { InputField } from '../components/Login/InputField';
import { Wrapper } from '../components/Login/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';

const Register = () => {
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
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
        }}
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
            <Button
              colorScheme="green"
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              w={'100%'}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
