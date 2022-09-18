import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { floatTaskType } from '../../types/taskTypes';
import { InputField } from '@agh-kiwis/ui-components';

type DependentTimeEstimationFieldProps = {
  name: string;
};

export const DependentTimeEstimationField: React.FC<
  DependentTimeEstimationFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<floatTaskType>();

  useEffect(() => {
    if (values.timeEstimation.hours === 0) {
      setFieldValue(name, `${values.timeEstimation.minutes}min`);
    } else if (values.timeEstimation.minutes === 0) {
      setFieldValue(name, `${values.timeEstimation.hours}h`);
    } else {
      setFieldValue(
        name,
        `${values.timeEstimation.hours}h ${values.timeEstimation.minutes}min`
      );
    }
  }, [
    name,
    setFieldValue,
    values.timeEstimation.hours,
    values.timeEstimation.minutes,
  ]);

  return <InputField name={name} label="Estimation" />;
};
