import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { constTaskType } from '../../types/taskTypes';
import { InputField } from '@agh-kiwis/ui-components';

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

  return <InputField name={name} label="Start time" />;
};
