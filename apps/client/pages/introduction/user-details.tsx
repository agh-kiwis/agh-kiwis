import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMeQuery, useUpdateUserMutation } from '@agh-kiwis/data-access';
import { UserDetailsType } from '@agh-kiwis/types';
import {
  CommonButton,
  CustomSpinner,
  InputField,
  Logo,
  Wrapper,
} from '@agh-kiwis/ui-components';
import { initialUserDetails } from '../../formConfig/introductionInitialValues';
import { mapUserDetailsToUpdateUserMutation } from '../../services/introductionService';

const UserDetails: React.FC = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const [updateUserMutation] = useUpdateUserMutation();

  const onSubmit = (values: UserDetailsType) => {
    updateUserMutation({
      variables: {
        updateUserInput: mapUserDetailsToUpdateUserMutation(
          data?.me?.id,
          values
        ),
      },
    });
    router.push('/introduction/sleep-preferences');
  };

  if (loading) {
    return <CustomSpinner />;
  }
  return (
    <Wrapper>
      <Logo textVisible={false} />
      <Formik
        initialValues={initialUserDetails}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Flex w="100%" justifyContent="center">
              <Text fontSize="4xl">Introduce Yourself!</Text>
            </Flex>
            <Box my="4">
              <InputField name="name" placeholder="Name" label="Name" />
            </Box>
            <Box my="4">
              <InputField name="birthDate" label="Birthdate" type="date" />
            </Box>
            <Flex w="100%" justifyContent="space-around" my="6">
              <RadioGroup name="gender">
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="green"
                    size="lg"
                    onChange={() => setFieldValue('gender', 'male')}
                  >
                    Male
                  </Radio>
                  <Radio
                    colorScheme="green"
                    size="lg"
                    onChange={() => setFieldValue('gender', 'female')}
                  >
                    Female
                  </Radio>
                </Stack>
              </RadioGroup>
            </Flex>

            <VStack mt={4} spacing={4}>
              <CommonButton
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                buttonText="Next"
              />
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default UserDetails;
