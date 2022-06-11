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
  label: string;
  name: string;
  isTextArea?: boolean;
  focusBorderColor?: string;
};
// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  isTextArea,
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
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea
        {...field}
        {...props}
        id={field.name}
        focusBorderColor={props.focusBorderColor || 'green.500'}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
