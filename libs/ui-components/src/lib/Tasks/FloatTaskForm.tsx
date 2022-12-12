import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Flex, VStack, useDisclosure } from '@chakra-ui/react';
import { TaskSchema } from '@agh-kiwis/form-validators';
import { FloatTaskType } from '@agh-kiwis/types';
import {
  CommonButton,
  DependentMaxChunkTimeField,
  DependentMinChunkTimeField,
  ToggleSwitch,
  Wrapper,
} from '@agh-kiwis/ui-components';
import {
  ADD_TASK,
  AUTORESOLVE_INFO,
  CHUNKING_INFO,
  UPDATE_TASK,
} from '@agh-kiwis/workspace-constants';
import { InfoToggleSwitch } from '../Common/InfoToggleSwitch';
import { CategoryInput } from '../Form/CategoryInput';
import { ChillTimeInput } from '../Form/ChillTimeInput';
import { DeadlineInput } from '../Form/DeadlineInput';
import { EstimationInput } from '../Form/EstimationInput';
import { ModeHeader } from '../Form/ModeHeader';
import { PrioritySelection } from '../Form/PrioritySelection';
import { StartTimeInput } from '../Form/StartTimeInput';
import { TaskNameInput } from '../Form/TaskNameInput';
import { IntervalPicker, NumberInputType } from '../Pickers/IntervalPicker';

type FloatTaskFormProps = {
  initialValues: FloatTaskType;
  estimationInputFields: NumberInputType[];
  chillTimeInputFields: NumberInputType[];
  minChunkTimeInputFields: NumberInputType[];
  maxChunkTimeInputFields: NumberInputType[];
  minTimeBetweenChunksInputFields: NumberInputType[];
  onSubmit: (values: FloatTaskType) => void;
  isInEditMode: boolean;
};

export const FloatTaskForm: React.FC<FloatTaskFormProps> = ({
  initialValues,
  estimationInputFields,
  chillTimeInputFields,
  minChunkTimeInputFields,
  maxChunkTimeInputFields,
  onSubmit,
  isInEditMode,
}) => {
  const router = useRouter();
  const {
    isOpen: isCTInfoOpen,
    onToggle: onCTInfoToggle,
    onClose: onCTInfoClose,
  } = useDisclosure();
  const {
    isOpen: isARInfoOpen,
    onToggle: onARInfoToggle,
    onClose: onARInfoClose,
  } = useDisclosure();
  const {
    isOpen: isEInfoOpen,
    onToggle: onEInfoToggle,
    onClose: onEInfoClose,
  } = useDisclosure();

  const {
    isOpen: isChunkInfoOpen,
    onToggle: onChunkInfoToggle,
    onClose: onChunkInfoClose,
  } = useDisclosure();

  return (
    <Wrapper>
      <ModeHeader isFloat={true} isInEditMode={isInEditMode} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={TaskSchema}
      >
        {({ touched, isSubmitting, setFieldValue, values }) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <CategoryInput setFieldValue={setFieldValue} />
              <TaskNameInput touched={touched} />
              {/* We need to add StartTime field to FloatForm */}
              {/* <StartTimeInput setFieldValue={setFieldValue} /> */}
              <DeadlineInput setFieldValue={setFieldValue} />

              <Flex justify="space-between">
                <EstimationInput
                  touched={touched}
                  estimationInputFields={estimationInputFields}
                  setFieldValue={setFieldValue}
                  isEInfoOpen={isEInfoOpen}
                  onEInfoToggle={onEInfoToggle}
                  onEInfoClose={onEInfoClose}
                />
                <ChillTimeInput
                  touched={touched}
                  chillTimeInputFields={chillTimeInputFields}
                  setFieldValue={setFieldValue}
                  isCTInfoOpen={isCTInfoOpen}
                  onCTInfoToggle={onCTInfoToggle}
                  onCTInfoClose={onCTInfoClose}
                />
              </Flex>
              <PrioritySelection setFieldValue={setFieldValue} />
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
                </Box>
              ) : (
                <Box>
                  <InfoToggleSwitch
                    isOpen={isChunkInfoOpen}
                    onToggle={onChunkInfoToggle}
                    onClose={onChunkInfoClose}
                    message={CHUNKING_INFO}
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
                <InfoToggleSwitch
                  isOpen={isARInfoOpen}
                  onToggle={onARInfoToggle}
                  onClose={onARInfoClose}
                  message={AUTORESOLVE_INFO}
                  name="autoResolve"
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
