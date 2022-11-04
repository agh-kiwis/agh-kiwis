import { Form, Formik } from 'formik';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import {
  CommonButton,
  InputField,
  Logo,
  Wrapper,
} from '@agh-kiwis/ui-components';

const SleepPreferences: React.FC = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Wrapper>
      <Logo textVisible={false} />
      <Formik
        initialValues={{ sleep: '', wakeUp: '' }}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Flex w="100%" justifyContent="center">
              <Text fontSize="4xl">When do You sleep?</Text>
            </Flex>
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

export default SleepPreferences;
