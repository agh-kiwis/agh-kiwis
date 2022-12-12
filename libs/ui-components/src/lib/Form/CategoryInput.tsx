import React from 'react';
import { Box } from '@chakra-ui/react';
import { ControlledInputAddon } from '../Common/ControlledInputAddon';
import { ColorPicker } from '../Pickers/ColorPicker';

type CategoryInputProps = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const CategoryInput: React.FC<CategoryInputProps> = ({
  setFieldValue,
}) => {
  return (
    <Box>
      <ColorPicker
        modalTitle="Category"
        handleChange={setFieldValue}
        name="category.id"
      >
        <ControlledInputAddon name="category" />
      </ColorPicker>
    </Box>
  );
};
