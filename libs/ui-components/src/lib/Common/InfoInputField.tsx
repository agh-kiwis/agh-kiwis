import { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  PlacementWithLogical,
  Textarea,
} from '@chakra-ui/react';
import { Information } from './Information';

type InfoInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  isTextArea?: boolean;
  placement: PlacementWithLogical | undefined;
  displayedValue?: string;
  message: string;
  borderLeftRadius?: number;
  validate?: (value: string | number) => string;
  touched?: boolean;
  readOnly?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onModalOpen: () => void;
};

export const InfoInputField: React.FC<InfoInputFieldProps> = ({
  isTextArea,
  label,
  touched,
  message,
  placement,
  isOpen,
  onModalOpen,
  onToggle,
  onClose,
  ...props
}) => {
  let InputOrTextArea = Input as React.FC;
  if (isTextArea) {
    InputOrTextArea = Textarea;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!(touched && error)}>
      <HStack>
        {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
        <Information
          placement={placement}
          isOpen={isOpen}
          message={message}
          onToggle={onToggle}
          onClose={onClose}
        />
      </HStack>
      <Box onClick={onModalOpen}>
        <InputOrTextArea {...field} {...props} />
        {touched && error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </Box>
    </FormControl>
  );
};
