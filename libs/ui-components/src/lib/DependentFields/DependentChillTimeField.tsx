import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { ConstTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';

type DependentChillTimeFieldProps = {
  name: string;
};

export const DependentChillTimeField: React.FC<
  DependentChillTimeFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<ConstTaskType>();

  useEffect(() => {
    setFieldValue(name, `${values.chillTime.minutes}min`);
  }, [name, setFieldValue, values.chillTime.minutes]);

  return <InputField name={name} readOnly={true} label="Chill time" />;
};
