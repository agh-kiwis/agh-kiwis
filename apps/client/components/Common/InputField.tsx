import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  isTextArea?: boolean;
  displayedValue?: string;
  borderLeftRadius?: number;
};

export const InputField: React.FC<InputFieldProps> = ({
  isTextArea,
  label,
  ...props
}) => {
  let InputOrTextArea = Input as React.FC;
  if (isTextArea) {
    InputOrTextArea = Textarea;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <InputOrTextArea {...field} {...props} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
