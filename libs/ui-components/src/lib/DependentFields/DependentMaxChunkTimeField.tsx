import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { FloatTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';

type DependentMaxChunkTimeFieldProps = {
  name: string;
};

export const DependentMaxChunkTimeField: React.FC<
  DependentMaxChunkTimeFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<FloatTaskType>();

  useEffect(() => {
    if (values.chunking.maxChunkTime.hours === 0) {
      setFieldValue(name, `${values.chunking.maxChunkTime.minutes}min`);
    } else if (values.chunking.maxChunkTime.minutes === 0) {
      setFieldValue(name, `${values.chunking.maxChunkTime.hours}h`);
    } else {
      setFieldValue(
        name,
        `${values.chunking.maxChunkTime.hours}h ${values.chunking.maxChunkTime.minutes}min`
      );
    }
  }, [
    name,
    setFieldValue,
    values.chunking.maxChunkTime.hours,
    values.chunking.maxChunkTime.minutes,
  ]);

  return <InputField name={name} readOnly={true} label="Max chunk itme" />;
};
