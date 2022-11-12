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
import { ConstTaskType } from '@agh-kiwis/types';
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
import {
  ADD_NEW_TASK,
  ADD_TASK,
  UPDATE_EXISTING_TASK,
  UPDATE_TASK,
} from '@agh-kiwis/workspace-constants';

type ConstTaskFormProps = {
  initialValues: ConstTaskType;
  durationInputFields: NumberInputType[];
  chillTimeInputFields: NumberInputType[];
  repeatEverySelectField: LongIntervalSelectType;
  repeatEveryAmountFields: LongIntervalAmountType[];
  onSubmit: (values: ConstTaskType) => void;
  isInEditMode: boolean;
};

export const ConstTaskForm: React.FC<ConstTaskFormProps> = ({
  initialValues,
  durationInputFields,
  chillTimeInputFields,
  repeatEverySelectField,
  repeatEveryAmountFields,
  onSubmit,
  isInEditMode,
}) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Box mb={4}>
        <Header
          text={isInEditMode ? UPDATE_EXISTING_TASK : ADD_NEW_TASK}
          size="xl"
        />
      </Box>
      <TaskSwitchConst isDisabled={isInEditMode} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={TaskSchema}
      >
        {({ touched, isSubmitting, setFieldValue, values }) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <Box>
                <ColorPicker
                  modalTitle="Category"
                  handleChange={setFieldValue}
                  name="category.id"
                >
                  <ControlledInputAddon name="category" />
                </ColorPicker>
              </Box>

              <Box>
                <InputField
                  name="taskName"
                  placeholder="Task name"
                  label="Task name"
                  touched={!!touched.taskName}
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
                  buttonText={isInEditMode ? UPDATE_TASK : ADD_TASK}
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
