import { InputLeftAddon } from '@chakra-ui/react';
import { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type ControlledInputAddonProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  addonContent: string;
  displayedValue?: string;
};

export const ControlledInputAddon: React.FC<ControlledInputAddonProps> = ({
  addonContent,
  ...props
}) => {
  const field = useField(props);
  return (
    <InputLeftAddon bg={field[1].value} color="white">
      color
    </InputLeftAddon>
  );
};
