import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { constTaskType } from '../../types/taskTypes';
import { InputField } from '@agh-kiwis/ui-components';

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

  return <InputField name={name} label="Repeat every" />;
};
