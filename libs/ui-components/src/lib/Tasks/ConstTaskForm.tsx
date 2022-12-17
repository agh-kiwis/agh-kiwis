import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Flex, VStack, useDisclosure } from '@chakra-ui/react';
import { TaskSchema } from '@agh-kiwis/form-validators';
import { ConstTaskType } from '@agh-kiwis/types';
import {
  CommonButton,
  DependentRepeatEveryField,
  InputField,
  LongIntervalAmountType,
  LongIntervalPicker,
  LongIntervalSelectType,
  NumberInputType,
  ToggleSwitch,
  Wrapper,
} from '@agh-kiwis/ui-components';
import {
  ADD_TASK,
  AUTORESOLVE_INFO,
  UPDATE_TASK,
} from '@agh-kiwis/workspace-constants';
import { InfoToggleSwitch } from '../Common/InfoToggleSwitch';
import { CategoryInput } from '../Form/CategoryInput';
import { ChillTimeInput } from '../Form/ChillTimeInput';
import { DurationInput } from '../Form/DurationInput';
import { IntroductionHeader } from '../Form/IntroductionHeader';
import { ModeHeader } from '../Form/ModeHeader';
import { PrioritySelection } from '../Form/PrioritySelection';
import { StartTimeInput } from '../Form/StartTimeInput';
import { TaskNameInput } from '../Form/TaskNameInput';

type ConstTaskFormProps = {
  initialValues: ConstTaskType;
  durationInputFields: NumberInputType[];
  chillTimeInputFields: NumberInputType[];
  repeatEverySelectField: LongIntervalSelectType;
  repeatEveryAmountFields: LongIntervalAmountType[];
  onSubmit: (values: ConstTaskType) => void;
  isInEditMode: boolean;
  isInIntroductionMode?: boolean;
  customText?: string;
  nextStep?: string;
};

export const ConstTaskForm: React.FC<ConstTaskFormProps> = ({
  initialValues,
  durationInputFields,
  chillTimeInputFields,
  repeatEverySelectField,
  repeatEveryAmountFields,
  onSubmit,
  isInEditMode,
  isInIntroductionMode,
  customText,
  nextStep,
}) => {
  const router = useRouter();

  const {
    isOpen: isARInfoOpen,
    onToggle: onARInfoToggle,
    onClose: onARInfoClose,
  } = useDisclosure();

  return (
    <Wrapper>
      {isInIntroductionMode ? (
        <IntroductionHeader message={customText} />
      ) : (
        <ModeHeader isFloat={false} isInEditMode={isInEditMode} />
      )}

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
              <StartTimeInput setFieldValue={setFieldValue} />

              <Flex justify="space-between">
                <DurationInput
                  touched={touched}
                  durationInputFields={durationInputFields}
                  setFieldValue={setFieldValue}
                />
                <ChillTimeInput
                  touched={touched}
                  chillTimeInputFields={chillTimeInputFields}
                  setFieldValue={setFieldValue}
                />
              </Flex>
              <PrioritySelection setFieldValue={setFieldValue} />

              {values.repeat.shouldRepeat ? (
                <Box boxShadow="inner" borderRadius={8} p={4}>
                  <ToggleSwitch
                    name="repeat.shouldRepeat"
                    label="Repeat"
                    handleChange={setFieldValue}
                  />
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
                    <Box my={4}>
                      <InputField
                        type="date"
                        label="Repeat until"
                        name="repeat.repeatUntil"
                      />
                    </Box>
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
                <InfoToggleSwitch
                  label="Autoresolve"
                  name="autoResolve"
                  handleChange={setFieldValue}
                  message={AUTORESOLVE_INFO}
                  isOpen={isARInfoOpen}
                  onToggle={onARInfoToggle}
                  onClose={onARInfoClose}
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
                {isInIntroductionMode ? (
                  <CommonButton
                    variant="outline"
                    buttonText="Skip"
                    onClick={() => router.push(`${nextStep}`)}
                  />
                ) : (
                  <CommonButton
                    variant="outline"
                    buttonText="Cancel"
                    onClick={() => router.push('/todo-list')}
                  />
                )}
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
