import React from 'react';
import { DependentStartTimeField } from '../DependentFields/DependentStartTimeField';
import { DateTimePicker } from '../Pickers/DateTimePicker';

type StartTimeProps = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const StartTimeInput: React.FC<StartTimeProps> = ({ setFieldValue }) => {
  return (
    <DateTimePicker
      modalTitle="Start time"
      handleChange={setFieldValue}
      label="Start"
      name="startTime"
    >
      <DependentStartTimeField name="startTimeFacade" />
    </DateTimePicker>
  );
};
