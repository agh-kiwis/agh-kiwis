import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { InputField } from '../Common/InputField';
import { constTaskType } from '../Tasks/ConstTaskForm';

type DependentStartTimeFieldProps = {
  name: string;
};

export const DependentStartTimeField: React.FC<
  DependentStartTimeFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<constTaskType>();

  useEffect(() => {
    {
      setFieldValue(
        name,
        `${values.startTime.date}  at  ${values.startTime.time}`
      );
    }
  }, [name, setFieldValue, values.startTime.date, values.startTime.time]);

  return (
    <InputField
      name="startTimeFacade"
      placeholder="Start time"
      label="Start time"
    />
  );
};