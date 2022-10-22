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
import { floatTaskType } from '@agh-kiwis/types';
import {
  CommonButton,
  ControlledInputAddon,
  CustomNumberInput,
  DependentChillTimeField,
  DependentDeadlineField,
  DependentMaxChunkTimeField,
  DependentMinChunkTimeField,
  DependentMinTimeBetweenChunksField,
  DependentTimeEstimationField,
  Header,
  InputField,
  TaskSwitchFloat,
  ToggleSwitch,
  Wrapper,
} from '@agh-kiwis/ui-components';
import { ColorPicker } from '../Pickers/ColorPicker';
import { DateTimePicker } from '../Pickers/DateTimePicker';
import { IntervalPicker, NumberInputType } from '../Pickers/IntervalPicker';

type FloatTaskFormProps = {
  initialValues: floatTaskType;
  estimationInputFields: NumberInputType[];
  chillTimeInputFields: NumberInputType[];
  minChunkTimeInputFields: NumberInputType[];
  maxChunkTimeInputFields: NumberInputType[];
  minTimeBetweenChunksInputFields: NumberInputType[];
  onSubmit: (values: floatTaskType) => void;
  submitButtonText: string;
};

export const FloatTaskForm: React.FC<FloatTaskFormProps> = ({
  initialValues,
  estimationInputFields,
  chillTimeInputFields,
  minChunkTimeInputFields,
  maxChunkTimeInputFields,
  minTimeBetweenChunksInputFields,
  onSubmit,
  submitButtonText,
}) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Box mb={4}>
        <Header text="Add new task" size="lg" />
      </Box>
      <TaskSwitchFloat />
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
                modalTitle="Deadline"
                handleChange={setFieldValue}
                label="Deadline"
                name="deadline"
              >
                <DependentDeadlineField name="deadlineFacade" />
              </DateTimePicker>
              <Flex justify="space-between">
                <Box w="50%" mr={2}>
                  <IntervalPicker
                    modalTitle="Time estimation"
                    inputFields={estimationInputFields}
                    handleChange={setFieldValue}
                  >
                    <DependentTimeEstimationField name="timeEstimationFacade" />
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
              {values.chunking.shouldChunk ? (
                <Box boxShadow="inner" borderRadius={8} p={4}>
                  <ToggleSwitch
                    name="chunking.shouldChunk"
                    label="Chunking"
                    handleChange={setFieldValue}
                  />
                  <Box my={4}>
                    <IntervalPicker
                      modalTitle="Min chunk time"
                      inputFields={minChunkTimeInputFields}
                      handleChange={setFieldValue}
                    >
                      <DependentMinChunkTimeField name="minChunkTimeFacade" />
                    </IntervalPicker>
                  </Box>
                  <Box my={4}>
                    <IntervalPicker
                      modalTitle="Max chunk time"
                      inputFields={maxChunkTimeInputFields}
                      handleChange={setFieldValue}
                    >
                      <DependentMaxChunkTimeField name="maxChunkTimeFacade" />
                    </IntervalPicker>
                  </Box>
                  <Box>
                    <IntervalPicker
                      modalTitle="Min time between Chunks"
                      inputFields={minTimeBetweenChunksInputFields}
                      handleChange={setFieldValue}
                    >
                      <DependentMinTimeBetweenChunksField name="minTimeBetweenChunksFacade" />
                    </IntervalPicker>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <ToggleSwitch
                    name="chunking.shouldChunk"
                    label="Chunking"
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
                  buttonText={submitButtonText}
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
