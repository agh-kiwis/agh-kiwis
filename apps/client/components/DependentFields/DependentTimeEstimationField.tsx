import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { InputField } from '../Common/InputField';
import { floatTaskType } from '../Tasks/FloatTaskForm';

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

  return (
    <InputField
      name="timeEstimationFacade"
      placeholder="Time estimation"
      label="Time estimation"
    />
  );
};
