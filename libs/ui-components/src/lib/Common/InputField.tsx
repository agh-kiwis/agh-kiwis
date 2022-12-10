import { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  isTextArea?: boolean;
  displayedValue?: string;
  borderLeftRadius?: number;
  validate?: (value: string | number) => string;
  touched?: boolean;
  readOnly?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  isTextArea,
  label,
  touched,
  ...props
}) => {
  let InputOrTextArea = Input as React.FC;
  if (isTextArea) {
    InputOrTextArea = Textarea;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!(touched && error)}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <InputOrTextArea {...field} {...props} />
      {touched && error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
