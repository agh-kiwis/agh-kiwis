import { HStack } from '@chakra-ui/react';
import {
  DEFAULT_COLOR,
  INSIGNIFICANT_COLOR,
} from '@agh-kiwis/workspace-constants';

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
      bgColor={checked ? INSIGNIFICANT_COLOR : DEFAULT_COLOR}
      borderRadius="0.5rem"
      px="2"
    >
      {children}
    </HStack>
  );
};
