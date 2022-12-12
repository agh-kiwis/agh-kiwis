import React from 'react';
import { FormikTouched } from 'formik';
import { Box } from '@chakra-ui/react';
import { ConstTaskType } from '@agh-kiwis/types';
import { DependentDurationField } from '../DependentFields/DependentDurationField';
import { IntervalPicker, NumberInputType } from '../Pickers/IntervalPicker';

type DurationInputProps = {
  touched: FormikTouched<ConstTaskType>;
  durationInputFields: NumberInputType[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const DurationInput: React.FC<DurationInputProps> = ({
  durationInputFields,
  setFieldValue,
}) => {
  return (
    <Box w="50%" mr={2}>
      <IntervalPicker
        modalTitle="Duration"
        inputFields={durationInputFields}
        handleChange={setFieldValue}
      >
        <DependentDurationField name="durationFacade" />
      </IntervalPicker>
    </Box>
  );
};
