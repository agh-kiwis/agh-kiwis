import React from 'react';
import { Box, FormLabel, Select } from '@chakra-ui/react';

type PrioritySelectionInputProps = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const PrioritySelection: React.FC<PrioritySelectionInputProps> = ({
  setFieldValue,
}) => {
  return (
    <Box>
      <FormLabel htmlFor="priority">Priority</FormLabel>
      <Select
        name="priority"
        onChange={(e) => setFieldValue('priority', e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
    </Box>
  );
};
