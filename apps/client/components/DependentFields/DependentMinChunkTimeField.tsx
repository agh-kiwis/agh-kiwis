import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { InputField } from '../Common/InputField';
import { floatTaskType } from '../../Types/TaskTypes';

type DependentMinChunkTimeFieldProps = {
  name: string;
};

export const DependentMinChunkTimeField: React.FC<
  DependentMinChunkTimeFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<floatTaskType>();

  useEffect(() => {
    setFieldValue(name, `${values.chunking.minChunkTime.minutes}min`);
  }, [name, setFieldValue, values.chunking.minChunkTime.minutes]);

  return <InputField name={name} label="Min chunk itme" />;
};
