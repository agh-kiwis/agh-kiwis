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
  priority: string;
  repeat: boolean;
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

const ConstTask: React.FC = () => {
  const initialValues: constTaskType = {
    type: '',
    category: {
      color: '#38A169',
      name: '',
    },
    color: '',
    taskName: '',
    startTime: {
      date: moment().format('DD/MM/YYYY'),
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
    priority: '',
    repeat: false,
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

  return (
    <Wrapper>
      <Heading textAlign={'center'} color="secondary" mb={4}>
        Add new task
      </Heading>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue }) => (
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
                <IntervalPicker
                  modalTitle="Duration"
                  inputFields={durationInputFields}
                  handleChange={setFieldValue}
                >
                  <DependentDurationField name="durationFacade" />
                </IntervalPicker>
                <Box w={4} />
                <IntervalPicker
                  modalTitle="Chill time"
                  inputFields={chillTimeInputFields}
                  handleChange={setFieldValue}
                >
                  <DependentChillTimeField name="chillTimeFacade" />
                </IntervalPicker>
              </Flex>
              <Box>
                <InputField
                  name="priority"
                  placeholder="Priority"
                  label="Priority"
                />
              </Box>
              <Box boxShadow="inner" borderRadius={8} p={4}>
                <ToggleSwitch
                  name="repeat"
                  label="Repeat"
                  handleChange={setFieldValue}
                />
              </Box>
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
