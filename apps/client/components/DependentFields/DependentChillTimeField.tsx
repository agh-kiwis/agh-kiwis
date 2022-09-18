import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { constTaskType } from '../../types/taskTypes';
import { InputField } from '@agh-kiwis/ui-components';

type DependentChillTimeFieldProps = {
  name: string;
};

export const DependentChillTimeField: React.FC<
  DependentChillTimeFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<constTaskType>();

  useEffect(() => {
    setFieldValue(name, `${values.chillTime.minutes}min`);
  }, [name, setFieldValue, values.chillTime.minutes]);

  return <InputField name={name} label="Chill time" />;
};
