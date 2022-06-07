import { useRegisterMutation } from '@agh-kiwis/data-access';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Divider, Flex, Heading, VStack, Text } from '@chakra-ui/react';
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// TODO Change this to something supporting TS
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { CommonButton } from '../components/Common/CommonButton';
import { InputField } from '../components/Login/InputField';
import { Wrapper } from '../components/Login/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';
import NextLink from 'next/link';

const Register = () => {
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <Flex justify={'center'} direction={'column'} my={4}>
        <FontAwesomeIcon icon={faKiwiBird} fontSize="100" color="#2F855A" />
        <Heading size="2xl" textAlign={'center'}>
          agh kiwis
        </Heading>
      </Flex>

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
            <VStack mt={4} spacing={4}>
              <CommonButton
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                buttonText="Sign Up"
              />
            </VStack>
            <Flex justify={'space-around'} align={'center'} my={6}>
              <Divider mx={4} />
              <Text fontSize="sm" color="gray.300">
                OR
              </Text>
              <Divider mx={4} />
            </Flex>
            <NextLink href="/login" passHref>
              {/* <CommonButton variant="c" buttonText="Sign up" /> */}
              <Button variant="outline" colorScheme="green" w={'100%'}>
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
