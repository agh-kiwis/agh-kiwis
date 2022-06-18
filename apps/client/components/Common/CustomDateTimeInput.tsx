import React, { useEffect } from 'react';
import { Box, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';

export type CustomDateTimeInputProps = {
  type: string;
  label: string;
  name: string;
  handleChange: (fieldName: string, value: string) => void;
};

export const CustomDateTimeInput: React.FC<CustomDateTimeInputProps> = ({
  type,
  label,
  handleChange,
  ...props
}) => {
  const [field] = useField(props);

  useEffect(() => {
    handleChange(field.name, field.value);
  }, [field.name, field.value, handleChange]);

  return (
    <FormControl>
      <Flex justify="center" align="center">
        <Box w="100px">
          <FormLabel htmlFor={label}>{label}</FormLabel>
        </Box>
        <Box justifySelf="right">
          <Input {...field} type={type} w="180px" textAlign="center" />
        </Box>
      </Flex>
    </FormControl>
  );
};
