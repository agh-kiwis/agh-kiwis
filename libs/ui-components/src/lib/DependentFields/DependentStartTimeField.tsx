import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import moment from 'moment';
import { ConstTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';
import { DESCRIPTIVE_DATE_FORMAT } from '@agh-kiwis/workspace-constants';

type DependentStartTimeFieldProps = {
  name: string;
};

export const DependentStartTimeField: React.FC<
  DependentStartTimeFieldProps
> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<ConstTaskType>();

  useEffect(() => {
    {
      setFieldValue(
        name,
        `${moment(values.startTime.date).format(
          DESCRIPTIVE_DATE_FORMAT
        )}  at  ${values.startTime.time}`
      );
    }
  }, [name, setFieldValue, values.startTime.date, values.startTime.time]);

  return <InputField name={name} readOnly={true} label="Start time" />;
};
