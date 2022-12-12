import React from 'react';
import { FormikTouched } from 'formik';
import { Box } from '@chakra-ui/react';
import { ConstTaskType } from '@agh-kiwis/types';
import { InputField } from '../Common/InputField';

type TaskNameInputProps = {
  touched: FormikTouched<ConstTaskType>;
};

export const TaskNameInput: React.FC<TaskNameInputProps> = ({ touched }) => {
  return (
    <Box>
      <InputField
        name="taskName"
        placeholder="Task name"
        label="Task name"
        touched={!!touched.taskName}
      />
    </Box>
  );
};
