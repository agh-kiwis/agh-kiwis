import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useNumberInput,
} from '@chakra-ui/react';
import { useField } from 'formik';

export type CustomNumberInputProps = {
  label: string;
  name: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  step: number;
  handleChange: (fieldName: string, value: number) => void;
};

export const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  label,
  minValue,
  maxValue,
  defaultValue,
  step,
  handleChange,
  ...props
}) => {
  const [field] = useField(props);
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    min: minValue,
    max: maxValue,
    defaultValue: field.value ? field.value : defaultValue,
    step: step,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    handleChange(field.name, valueAsNumber);
  }, [field.name, handleChange, valueAsNumber]);

  return (
    <FormControl>
      <Flex justify="center" align="center">
        <Box w="80px">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
        </Box>
        <HStack justifySelf="right">
          <Button variant="outline" {...dec}>
            -
          </Button>
          <Input {...input} w="80px" textAlign="center" />
          <Button variant="outline" {...inc}>
            +
          </Button>
        </HStack>
      </Flex>
    </FormControl>
  );
};
