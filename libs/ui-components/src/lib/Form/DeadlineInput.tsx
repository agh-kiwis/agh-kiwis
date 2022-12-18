import React from 'react';
import { DependentDeadlineField } from '../DependentFields/DependentDeadlineField';
import { DateTimePicker } from '../Pickers/DateTimePicker';

type DeadlineInputProps = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const DeadlineInput: React.FC<DeadlineInputProps> = ({
  setFieldValue,
}) => {
  return (
    <DateTimePicker
      modalTitle="Deadline"
      handleChange={setFieldValue}
      label="Deadline"
      name="deadline"
    >
      <DependentDeadlineField name="deadlineFacade" />
    </DateTimePicker>
  );
};
