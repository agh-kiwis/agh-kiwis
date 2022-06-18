import * as react from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { CommonButton } from '../Buttons/CommonButton';
import { ControlledInputAddon } from '../Common/ControlledInputAddon';
import { CustomNumberInput } from '../Common/CustomNumberInput';
import { InputField } from '../Common/InputField';
import { ToggleSwitch } from '../Common/ToggleSwitch';
import { Wrapper } from '../Containers/Wrapper';
import { DependentChillTimeField } from '../DependentFields/DependentChillTimeField';
import { DependentDeadlineField } from '../DependentFields/DependentDeadlineField';
import { DependentTimeEstimationField } from '../DependentFields/DependentTimeEstimationField';
import { ColorPicker } from '../Pickers/ColorPicker';
import { DateTimePicker } from '../Pickers/DateTimePicker';
import { IntervalPicker, NumberInputType } from '../Pickers/IntervalPicker';
import { floatTaskType } from '../../Types/TaskTypes';

type FloatTaskCreationFormProps = {
  initialValues: floatTaskType;
  durationInputFields: NumberInputType[];
  chillTimeInputFields: NumberInputType[];
  onSubmit: (values) => void;
};

export const FloatTaskCreationForm: React.FC<FloatTaskCreationFormProps> = ({
  initialValues,
  durationInputFields,
  chillTimeInputFields,
  onSubmit,
}) => {
  return (
    <Wrapper>
      <react.Heading textAlign={'center'} color="secondary" mb={4}>
        Add new task
      </react.Heading>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <react.VStack spacing={4} align="stretch">
              <react.Box>
                <react.Stack>
                  <react.InputGroup>
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
                  </react.InputGroup>
                </react.Stack>
              </react.Box>

              <react.Box>
                <InputField
                  name="taskName"
                  placeholder="Task name"
                  label="Task name"
                />
              </react.Box>
              <DateTimePicker
                modalTitle="Deadline"
                handleChange={setFieldValue}
                label="Deadline"
                name="deadline"
              >
                <DependentDeadlineField name="deadlineFacade" />
              </DateTimePicker>
              <react.Flex justify="space-between">
                <react.Box w="50%" mr={2}>
                  <IntervalPicker
                    modalTitle="Time Estimation"
                    inputFields={durationInputFields}
                    handleChange={setFieldValue}
                  >
                    <DependentTimeEstimationField name="timeEstimationFacade" />
                  </IntervalPicker>
                </react.Box>
                <react.Box w="50%" ml={2}>
                  <IntervalPicker
                    modalTitle="Chill time"
                    inputFields={chillTimeInputFields}
                    handleChange={setFieldValue}
                  >
                    <DependentChillTimeField name="chillTimeFacade" />
                  </IntervalPicker>
                </react.Box>
              </react.Flex>
              <react.Box>
                <InputField
                  name="priority"
                  placeholder="Priority"
                  label="Priority"
                />
              </react.Box>
              {values.chunking.shouldChunk ? (
                <react.Box boxShadow="inner" borderRadius={8} p={4}>
                  <ToggleSwitch
                    name="chunking.shouldChunk"
                    label="Chunking"
                    handleChange={setFieldValue}
                  />
                  {/* TODO do usunięcia*/}
                  <CustomNumberInput
                    minValue={1}
                    maxValue={10}
                    defaultValue={1}
                    step={1}
                    label="Chunks"
                    name="chunking.numberOfChunks"
                    handleChange={setFieldValue}
                  />
                </react.Box>
              ) : (
                <react.Box>
                  <ToggleSwitch
                    name="chunking.shouldChunk"
                    label="Chunking"
                    handleChange={setFieldValue}
                  />
                </react.Box>
              )}

              <react.Box>
                <ToggleSwitch
                  name="notify"
                  label="Notify"
                  handleChange={setFieldValue}
                />
              </react.Box>
              <react.Box>
                <ToggleSwitch
                  name="autoresolve"
                  label="Autoresolve"
                  handleChange={setFieldValue}
                />
              </react.Box>

              <react.Box>
                <CommonButton
                  variant="solid"
                  type="submit"
                  isLoading={isSubmitting}
                  buttonText="Add"
                />
              </react.Box>
            </react.VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
