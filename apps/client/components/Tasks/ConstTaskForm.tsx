import React from 'react';
import { Form, Formik } from 'formik';
import {
  Box,
  Flex,
  Heading,
  InputGroup,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { CommonButton } from '../Buttons/CommonButton';
import { ControlledInputAddon } from '../Common/ControlledInputAddon';
import { InputField } from '../Common/InputField';
import { ToggleSwitch } from '../Common/ToggleSwitch';
import { Wrapper } from '../Containers/Wrapper';
import { DependentChillTimeField } from '../DependentFields/DependentChillTimeField';
import { DependentDurationField } from '../DependentFields/DependentDurationField';
import { DependentRepeatEveryField } from '../DependentFields/DependentRepeatEveryField';
import { DependentStartTimeField } from '../DependentFields/DependentStartTimeField';
import { ColorPicker } from '../Pickers/ColorPicker';
import { DateTimePicker } from '../Pickers/DateTimePicker';
import { IntervalPicker, NumberInputType } from '../Pickers/IntervalPicker';
import {
  LongIntervalAmountType,
  LongIntervalPicker,
  LongIntervalSelectType,
} from '../Pickers/LongIntervalPicker';
import { constTaskType } from '../../types/TaskTypes';

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
  return (
    <Wrapper>
      <Heading textAlign={'center'} color="secondary" mb={4}>
        Add new task
      </Heading>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <Box>
                <Stack>
                  <InputGroup>
                    <ColorPicker
                      modalTitle="Category color"
                      handleChange={setFieldValue}
                      name="category.color"
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
                <InputField
                  name="priority"
                  placeholder="Priority"
                  label="Priority"
                />
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
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
