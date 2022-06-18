import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { InputField } from '../Common/InputField';
import { floatTaskType } from '../Tasks/FloatTaskForm';

type DependentDeadlineFieldProps = {
  name: string;
};

export const DependentDeadlineField: React.FC<DependentDeadlineFieldProps> = ({
  name,
}) => {
  const { values, setFieldValue } = useFormikContext<floatTaskType>();

  useEffect(() => {
    {
      setFieldValue(
        name,
        `${values.deadline.date}  at  ${values.deadline.time}`
      );
    }
  }, [name, setFieldValue, values.deadline.date, values.deadline.time]);

  return (
    <InputField name="deadlineFacade" placeholder="Deadline" label="Deadline" />
  );
};
