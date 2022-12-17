import React from 'react';
import { useField } from 'formik';
import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Spacer,
  Switch,
} from '@chakra-ui/react';
import { AUTORESOLVE_INFO } from '@agh-kiwis/workspace-constants';
import { Information } from './Information';

type InfoToggleSwitchProps = {
  label: string;
  name: string;
  handleChange: (fieldName: string, value: boolean) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  message: string;
};

export const InfoToggleSwitch: React.FC<InfoToggleSwitchProps> = ({
  label,
  handleChange,
  isOpen,
  onToggle,
  onClose,
  message,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <FormControl>
      <Flex>
        <HStack>
          <FormLabel htmlFor={field.name} mr="0">
            {label}
          </FormLabel>
          <Information
            placement="top-start"
            isOpen={isOpen}
            message={message}
            onToggle={onToggle}
            onClose={onClose}
          />
        </HStack>
        <Spacer />
        <Switch
          {...field}
          {...props}
          id={field.name}
          isChecked={field.value}
          onChange={() => {
            handleChange(field.name, !field.value);
          }}
        />
      </Flex>
    </FormControl>
  );
};
