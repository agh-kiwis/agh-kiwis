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
      justifyContent={'space-between'}
      borderRadius={'0.5rem'}
      mb={'0.6rem'}
      color={'white'}
      bgColor={checked ? 'insignificant' : 'primary'}
    >
      {children}
    </HStack>
  );
};
