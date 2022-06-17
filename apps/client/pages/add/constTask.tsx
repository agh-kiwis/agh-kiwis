import React, { useEffect } from 'react';
import moment from 'moment';
import { Form, Formik, useFormikContext } from 'formik';
import {
  Box,
  Flex,
  Heading,
  InputGroup,
  Stack,
  VStack,
} from '@chakra-ui/react';
import {
  IntervalPicker,
  NumberInputType,
} from '../../components/Common/IntervalPicker';
import { Wrapper } from '../../components/Containers/Wrapper';
import { InputField } from '../../components/Common/InputField';
import { CommonButton } from '../../components/Common/CommonButton';
import { ToggleSwitch } from '../../components/Common/ToggleSwitch';
import { DateTimePicker } from '../../components/Common/DateTimePicker';
import { ColorPicker } from '../../components/Common/ColorPicker';
import { ControlledInputAddon } from '../../components/Common/ControlledInputAddon';
import {
  LongIntervalAmountType,
  LongIntervalPicker,
  LongIntervalSelectType,
} from '../../components/Common/LongIntervalPicker';

type constTaskType = {
  type: string;
  category: {
    color: string;
    name: string;
  };
  color: string;
  taskName: string;
  startTime: {
    date: string;
    time: string;
  };
  startTimeFacade: string;
  duration: {
    hours: number;
    minutes: number;
  };
  durationFacade: string;
  chillTime: {
    minutes: number;
  };
  chillTimeFacade: string;
  priority: string;
  repeat: {
    shouldRepeat: boolean;
    startFrom: string;
    repeatEvery: {
      type: string;
      amount: number;
    };
  };
  repeatEveryFacade: string;
  notify: boolean;
  autoresolve: boolean;
};

const DependentDurationField = (props) => {
  const { values, setFieldValue } = useFormikContext<constTaskType>();

  useEffect(() => {
    if (values.duration.hours === 0) {
      setFieldValue(props.name, `${values.duration.minutes}min`);
    } else {
      setFieldValue(
        props.name,
        `${values.duration.hours}h ${values.duration.minutes}min`
      );
    }
  }, [props.name, setFieldValue, values]);

  return (
    <InputField name="durationFacade" placeholder="Duration" label="Duration" />
  );
};

const DependentChillTimeField = (props) => {
  const { values, setFieldValue } = useFormikContext<constTaskType>();

  useEffect(() => {
    setFieldValue(props.name, `${values.chillTime.minutes}min`);
  }, [props.name, setFieldValue, values]);

  return (
    <InputField
      name="chillTimeFacade"
      placeholder="Chill time"
      label="Chill time"
    />
  );
};

const DependentStartTimeField = (props) => {
  const { values, setFieldValue } = useFormikContext<constTaskType>();

  useEffect(() => {
    {
      setFieldValue(
        props.name,
        `${values.startTime.date}  at  ${values.startTime.time}`
      );
    }
  }, [props.name, setFieldValue, values]);

  return (
    <InputField
      name="startTimeFacade"
      placeholder="Start time"
      label="Start time"
    />
  );
};

const DependentRepeatEveryField = (props) => {
  const { values, setFieldValue } = useFormikContext<constTaskType>();

  useEffect(() => {
    {
      setFieldValue(
        props.name,
        `${values.repeat.repeatEvery.amount} ${values.repeat.repeatEvery.type}`
      );
    }
  }, [props.name, setFieldValue, values]);

  return (
    <InputField
      name="repeatEveryFacade"
      placeholder="Repeat every"
      label="Repeat every"
    />
  );
};

const ConstTask: React.FC = () => {
  const initialValues: constTaskType = {
    type: 'const',
    category: {
      color: '#38A169',
      name: '',
    },
    color: '',
    taskName: '',
    startTime: {
      date: moment().format('yyyy-MM-DD'),
      time: moment().format('HH:MM'),
    },
    startTimeFacade: '',
    duration: {
      hours: 0,
      minutes: 15,
    },
    durationFacade: '',
    chillTime: {
      minutes: 5,
    },
    chillTimeFacade: '',
    priority: '',
    repeat: {
      shouldRepeat: false,
      startFrom: moment().format('yyyy-MM-DD'),
      repeatEvery: {
        type: 'Day',
        amount: 1,
      },
    },
    repeatEveryFacade: '',
    notify: false,
    autoresolve: false,
  };

  const onSubmit = async (values) => {
    console.log(values);
  };

  const durationInputFields: NumberInputType[] = [
    {
      minValue: 0,
      maxValue: 24,
      defaultValue: 0,
      step: 1,
      label: 'Hours',
      name: 'duration.hours',
    },
    {
      minValue: 0,
      maxValue: 60,
      defaultValue: 15,
      step: 5,
      label: 'Minutes',
      name: 'duration.minutes',
    },
  ];

  const chillTimeInputFields: NumberInputType[] = [
    {
      minValue: 0,
      maxValue: 60,
      defaultValue: 5,
      step: 5,
      label: 'Minutes',
      name: 'chillTime.minutes',
    },
  ];

  const repeatEverySelectField: LongIntervalSelectType = {
    name: 'repeat.repeatEvery.type',
    label: 'Type',
    options: ['Day', 'Week', 'Month'],
  };

  const repeatEveryAmountFields: LongIntervalAmountType[] = [
    {
      minValue: 1,
      maxValue: 28,
      defaultValue: 1,
      step: 1,
      label: 'Day',
      name: 'repeat.repeatEvery.amount',
    },
    {
      minValue: 1,
      maxValue: 4,
      defaultValue: 1,
      step: 1,
      label: 'Week',
      name: 'repeat.repeatEvery.amount',
    },
    {
      minValue: 1,
      maxValue: 12,
      defaultValue: 1,
      step: 1,
      label: 'Month',
      name: 'repeat.repeatEvery.amount',
    },
  ];

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
                      <ControlledInputAddon
                        addonContent="color"
                        name="category.color"
                      />
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

export default ConstTask;
