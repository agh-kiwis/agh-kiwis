import { useField } from 'formik';
import { InputLeftAddon } from '@chakra-ui/react';

type ControlledInputAddonProps = {
  name: string;
};

export const ControlledInputAddon: React.FC<ControlledInputAddonProps> = ({
  name,
}) => {
  const [field] = useField(name);

  return (
    <InputLeftAddon bg={field.value} color="white">
      color
    </InputLeftAddon>
  );
};
