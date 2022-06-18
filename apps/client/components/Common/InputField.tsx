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
  size: _,
  ...props
}) => {
  let InputOrTextArea = Input as any;
  if (isTextArea) {
    InputOrTextArea = Textarea;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <InputOrTextArea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
