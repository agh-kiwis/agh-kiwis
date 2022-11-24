import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import {
  useAddConstTaskMutation,
  useGetCategoriesQuery,
} from '@agh-kiwis/data-access';
import { SleepPreferencesType } from '@agh-kiwis/types';
import {
  CommonButton,
  CustomSpinner,
  InputField,
  Logo,
  Wrapper,
} from '@agh-kiwis/ui-components';
import { mapSleepPreferencesToAddConstTaskMutation } from '../..//services/introductionService';
import { initialSleepPreferences } from '../../formConfig/introductionInitialValues';

const SleepPreferences: React.FC = () => {
  const router = useRouter();
  const { data, loading } = useGetCategoriesQuery();
  const [addConstTaskMutation] = useAddConstTaskMutation();

  const onSubmit = (sleepPreferences: SleepPreferencesType) => {
    addConstTaskMutation({
      variables: {
        ConstTaskInput: mapSleepPreferencesToAddConstTaskMutation(
          sleepPreferences,
          data?.getCategories?.find((category) => category.name === 'Sleep')
        ),
      },
    });
    router.push('/introduction/meals/breakfast');
  };

  if (loading) {
    return <CustomSpinner />;
  }
  return (
    <Wrapper>
      <Logo textVisible={false} />
      <Flex w="100%" justifyContent="center">
        <Text fontSize="4xl">When do You sleep?</Text>
      </Flex>
      <Formik
        initialValues={initialSleepPreferences}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box my="4">
              <InputField
                name="sleep"
                label="I usually go to bed at..."
                type="time"
              />
            </Box>
            <Box my="4">
              <InputField
                name="wakeUp"
                label="I usually wake up at..."
                type="time"
              />
            </Box>

            <VStack mt="4" spacing="4">
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

export default SleepPreferences;
