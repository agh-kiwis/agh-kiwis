import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { InputField } from '@agh-kiwis/ui-components';
import { constTaskType } from '@agh-kiwis/types';

type DependentDurationFieldProps = {
  name: string;
};

export const DependentDurationField: React.FC<DependentDurationFieldProps> = ({
  name,
}) => {
  const { values, setFieldValue } = useFormikContext<constTaskType>();

  useEffect(() => {
    if (values.duration.hours === 0) {
      setFieldValue(name, `${values.duration.minutes}min`);
    } else if (values.duration.minutes === 0) {
      setFieldValue(name, `${values.duration.hours}h`);
    } else {
      setFieldValue(
        name,
        `${values.duration.hours}h ${values.duration.minutes}min`
      );
    }
  }, [name, setFieldValue, values.duration.hours, values.duration.minutes]);

  return <InputField name={name} label="Duration" />;
};
