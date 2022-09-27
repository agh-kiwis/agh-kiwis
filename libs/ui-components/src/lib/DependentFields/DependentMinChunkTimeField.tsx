import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { floatTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';

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
