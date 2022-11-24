import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { FloatTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';

type DependentMinTimeBetweenChunksFieldProps = {
  name: string;
};

export const DependentMinTimeBetweenChunksField: React.FC<
  DependentMinTimeBetweenChunksFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<FloatTaskType>();

  useEffect(() => {
    if (values.chunking.minTimeBetweenChunks.hours === 0) {
      setFieldValue(name, `${values.chunking.minTimeBetweenChunks.minutes}min`);
    } else if (values.chunking.minTimeBetweenChunks.minutes === 0) {
      setFieldValue(name, `${values.chunking.minTimeBetweenChunks.hours}h`);
    } else {
      setFieldValue(
        name,
        `${values.chunking.minTimeBetweenChunks.hours}h ${values.chunking.minTimeBetweenChunks.minutes}min`
      );
    }
  }, [
    name,
    setFieldValue,
    values.chunking.minTimeBetweenChunks.hours,
    values.chunking.minTimeBetweenChunks.minutes,
  ]);

  return <InputField name={name} label="Min time between chunks" />;
};
