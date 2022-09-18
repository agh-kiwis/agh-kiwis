import { Flex, FormControl, FormLabel, Spacer, Switch } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

type ToggleSwitchProps = {
  label: string;
  name: string;
  handleChange: (fieldName: string, value: boolean) => void;
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  handleChange,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <FormControl>
      <Flex>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Spacer />
        <Switch
          {...field}
          {...props}
          id={field.name}
          onChange={() => {
            handleChange(field.name, !field.value);
          }}
        />
      </Flex>
    </FormControl>
  );
};
