import { useCallback } from 'react';
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
import { UserPreferencesSchema } from '@agh-kiwis/form-validators';
import { UserDetailsType } from '@agh-kiwis/types';
import {
  CommonButton,
  CustomSpinner,
  InputField,
  Logo,
  Wrapper,
} from '@agh-kiwis/ui-components';
import {
  mapUserDetailsToUpdateUserMutation,
  userToUserDetailsType,
} from '../../services/userService';

const UserDetails: React.FC = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const [updateUserMutation] = useUpdateUserMutation();

  const onSubmit = useCallback(
    (values: UserDetailsType) => {
      updateUserMutation({
        variables: {
          updateUserInput: mapUserDetailsToUpdateUserMutation(
            data?.me?.id,
            values
          ),
        },
      });
      router.push('/settings');
    },
    [data?.me?.id, router, updateUserMutation]
  );

  if (loading) {
    return <CustomSpinner />;
  }
  return (
    <Wrapper>
      <Logo textVisible={false} />
      <Formik
        initialValues={userToUserDetailsType(data.me)}
        onSubmit={onSubmit}
        validationSchema={UserPreferencesSchema}
      >
        {({ touched, isSubmitting, setFieldValue }) => (
          <Form>
            <Flex w="100%" justifyContent="center">
              <Text fontSize="4xl">Edit details</Text>
            </Flex>
            <Box my="4">
              <InputField
                name="name"
                placeholder="Name"
                label="Name"
                touched={!!touched.name}
              />
            </Box>
            <Box my="4">
              <InputField
                name="birthDate"
                label="Birthdate"
                type="date"
                touched={!!touched.birthDate}
              />
            </Box>
            <Flex w="100%" justifyContent="space-around" my="6">
              <RadioGroup
                name="gender"
                defaultValue={data.me.gender}
                onChange={(gender) => setFieldValue('gender', gender)}
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" size="lg" value="male">
                    Male
                  </Radio>
                  <Radio colorScheme="green" size="lg" value="female">
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
                buttonText="Save"
              />
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default UserDetails;
