import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { floatTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';

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

  return <InputField name={name} label="Deadline" />;
};