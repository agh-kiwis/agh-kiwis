import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { InputField } from '../Common/InputField';
import { constTaskType } from '../../Types/TaskTypes';

type DependentRepeatEveryFieldProps = {
  name: string;
};

export const DependentRepeatEveryField: React.FC<
  DependentRepeatEveryFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<constTaskType>();

  useEffect(() => {
    {
      setFieldValue(
        name,
        `${values.repeat.repeatEvery.amount} ${values.repeat.repeatEvery.type}`
      );
    }
  }, [
    name,
    setFieldValue,
    values.repeat.repeatEvery.amount,
    values.repeat.repeatEvery.type,
  ]);

  return (
    <InputField
      name="repeatEveryFacade"
      placeholder="Repeat every"
      label="Repeat every"
    />
  );
};
