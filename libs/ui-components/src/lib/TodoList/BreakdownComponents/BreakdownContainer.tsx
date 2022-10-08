import { HStack } from '@chakra-ui/react';

type BreakdownContainerProps = {
  children: React.ReactNode;
  checked: boolean;
};

export const BreakdownContainer: React.FC<BreakdownContainerProps> = ({
  children,
  checked,
}) => {
  return (
    <HStack
      justifyContent="space-between"
      color="white"
      bgColor={checked ? 'insignificant' : 'primary'}
      borderRadius="0.5rem"
      px="2"
    >
      {children}
    </HStack>
  );
};
