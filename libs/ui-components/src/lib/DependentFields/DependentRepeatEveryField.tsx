import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { ConstTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';

type DependentRepeatEveryFieldProps = {
  name: string;
};

export const DependentRepeatEveryField: React.FC<
  DependentRepeatEveryFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<ConstTaskType>();

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
