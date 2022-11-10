import { useField } from 'formik';
import { Input } from '@chakra-ui/react';

type ControlledInputAddonProps = {
  name: string;
};

export const ControlledInputAddon: React.FC<ControlledInputAddonProps> = ({
  name,
}) => {
  const [field] = useField(name);

  return (
    <Input
      bg={field.value.color}
      textAlign="center"
      color="white"
      value={field.value.name}
    />
  );
};
