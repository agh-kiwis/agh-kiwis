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
      bgColor={checked ? 'insignificant' : 'primary'}
      borderRadius="0.5rem"
      color="white"
    >
      {children}
    </HStack>
  );
};
