import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import {
  Box,
  Flex,
  FormLabel,
  InputGroup,
  Select,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { TaskSchema } from '@agh-kiwis/form-validators';
import { constTaskType } from '@agh-kiwis/types';
import {
  ColorPicker,
  CommonButton,
  ControlledInputAddon,
  DateTimePicker,
  DependentChillTimeField,
  DependentDurationField,
  DependentRepeatEveryField,
  DependentStartTimeField,
  Header,
  InputField,
  IntervalPicker,
  LongIntervalAmountType,
  LongIntervalPicker,
  LongIntervalSelectType,
  NumberInputType,
  TaskSwitchConst,
  ToggleSwitch,
  Wrapper,
} from '@agh-kiwis/ui-components';

type ConstTaskCreationFormProps = {
  initialValues: constTaskType;
  durationInputFields: NumberInputType[];
  chillTimeInputFields: NumberInputType[];
  repeatEverySelectField: LongIntervalSelectType;
  repeatEveryAmountFields: LongIntervalAmountType[];
  onSubmit: (values: constTaskType) => void;
};

export const ConstTaskCreationForm: React.FC<ConstTaskCreationFormProps> = ({
  initialValues,
  durationInputFields,
  chillTimeInputFields,
  repeatEverySelectField,
  repeatEveryAmountFields,
  onSubmit,
}) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Box mb={4}>
        <Header text="Add new task" />
      </Box>
      <TaskSwitchConst />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnChange={false}
        validationSchema={TaskSchema}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <Box>
                <Stack>
                  <InputGroup>
                    <ColorPicker
                      modalTitle="Category color"
                      handleChange={setFieldValue}
                      name="category.id"
                    >
                      <ControlledInputAddon name="category.color" />
                    </ColorPicker>
                    <InputField
                      name="category.name"
                      placeholder="Category"
                      borderLeftRadius={0}
                    />
                  </InputGroup>
                </Stack>
              </Box>

              <Box>
                <InputField
                  name="taskName"
                  placeholder="Task name"
                  label="Task name"
                />
              </Box>
              <DateTimePicker
                modalTitle="Start time"
                handleChange={setFieldValue}
                label="Start"
                name="startTime"
              >
                <DependentStartTimeField name="startTimeFacade" />
              </DateTimePicker>
              <Flex justify="space-between">
                <Box w="50%" mr={2}>
                  <IntervalPicker
                    modalTitle="Duration"
                    inputFields={durationInputFields}
                    handleChange={setFieldValue}
                  >
                    <DependentDurationField name="durationFacade" />
                  </IntervalPicker>
                </Box>
                <Box w="50%" ml={2}>
                  <IntervalPicker
                    modalTitle="Chill time"
                    inputFields={chillTimeInputFields}
                    handleChange={setFieldValue}
                  >
                    <DependentChillTimeField name="chillTimeFacade" />
                  </IntervalPicker>
                </Box>
              </Flex>
              <Box>
                <FormLabel htmlFor="priority">Priority</FormLabel>
                <Select
                  name="priority"
                  onChange={(e) => setFieldValue('priority', e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </Box>
              {values.repeat.shouldRepeat ? (
                <Box boxShadow="inner" borderRadius={8} p={4}>
                  <ToggleSwitch
                    name="repeat.shouldRepeat"
                    label="Repeat"
                    handleChange={setFieldValue}
                  />
                  <Box my={4}>
                    <InputField
                      type="date"
                      label="Start from"
                      name="repeat.startFrom"
                    />
                  </Box>
                  <Box my={4}>
                    <LongIntervalPicker
                      modalTitle="Repeat every"
                      selectField={repeatEverySelectField}
                      amountFields={repeatEveryAmountFields}
                      selectValue={values.repeat.repeatEvery.type}
                      handleChange={setFieldValue}
                    >
                      <DependentRepeatEveryField name="repeatEveryFacade" />
                    </LongIntervalPicker>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <ToggleSwitch
                    name="repeat.shouldRepeat"
                    label="Repeat"
                    handleChange={setFieldValue}
                  />
                </Box>
              )}

              <Box>
                <ToggleSwitch
                  name="notify"
                  label="Notify"
                  handleChange={setFieldValue}
                />
              </Box>
              <Box>
                <ToggleSwitch
                  name="autoresolve"
                  label="Autoresolve"
                  handleChange={setFieldValue}
                />
              </Box>

              <Box>
                <CommonButton
                  variant="solid"
                  type="submit"
                  isLoading={isSubmitting}
                  buttonText="Add"
                />
              </Box>
              <Box>
                <CommonButton
                  variant="outline"
                  buttonText="Cancel"
                  onClick={() => router.push('/')}
                />
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
