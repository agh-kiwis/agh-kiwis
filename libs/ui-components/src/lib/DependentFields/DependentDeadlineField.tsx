import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import moment from 'moment';
import { FloatTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';
import { DESCRIPTIVE_DATE_FORMAT } from '@agh-kiwis/workspace-constants';

type DependentDeadlineFieldProps = {
  name: string;
};

export const DependentDeadlineField: React.FC<DependentDeadlineFieldProps> = ({
  name,
}) => {
  const { values, setFieldValue } = useFormikContext<FloatTaskType>();

  useEffect(() => {
    {
      setFieldValue(
        name,
        `${moment(values.deadline.date).format(DESCRIPTIVE_DATE_FORMAT)}  at  ${
          values.deadline.time
        }`
      );
    }
  }, [name, setFieldValue, values.deadline.date, values.deadline.time]);

  return <InputField name={name} readOnly={true} label="Deadline" />;
};
