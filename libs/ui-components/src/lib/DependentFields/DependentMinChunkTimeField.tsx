import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { FloatTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';

type DependentMinChunkTimeFieldProps = {
  name: string;
};

export const DependentMinChunkTimeField: React.FC<
  DependentMinChunkTimeFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<FloatTaskType>();

  useEffect(() => {
    setFieldValue(name, `${values.chunking.minChunkTime.minutes}min`);
  }, [name, setFieldValue, values.chunking.minChunkTime.minutes]);

  return <InputField name={name} readOnly={true} label="Min chunk itme" />;
};
