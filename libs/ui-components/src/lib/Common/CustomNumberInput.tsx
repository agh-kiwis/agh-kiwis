import React, { useEffect } from 'react';
import { useField } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  useNumberInput,
} from '@chakra-ui/react';

export type CustomNumberInputProps = {
  label: string;
  name: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  step: number;
  handleChange: (fieldName: string, value: number) => void;
  variant?: 'vertical' | 'horizontal';
};

export const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  label,
  minValue,
  maxValue,
  defaultValue,
  step,
  handleChange,
  variant,
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
    <>
      {variant === 'vertical' ? (
        <FormControl>
          <VStack align="stretch">
            <Box my={0} py={0}>
              <FormLabel
                htmlFor={field.name}
                justifyContent="bottom"
                my={0}
                py={0}
              >
                {label}
              </FormLabel>
            </Box>
            <HStack justifySelf="right">
              <Button variant="outline" {...dec}>
                -
              </Button>
              <Input {...input} readOnly={true} textAlign="center" />
              <Button variant="outline" {...inc}>
                +
              </Button>
            </HStack>
          </VStack>
        </FormControl>
      ) : (
        <FormControl>
          <Flex justify="center" align="center">
            <Box w="80px">
              <FormLabel htmlFor={field.name}>{label}</FormLabel>
            </Box>
            <HStack justifySelf="right">
              <Button variant="outline" {...dec}>
                -
              </Button>
              <Input {...input} readOnly={true} w="80px" textAlign="center" />
              <Button variant="outline" {...inc}>
                +
              </Button>
            </HStack>
          </Flex>
        </FormControl>
      )}
    </>
  );
};
