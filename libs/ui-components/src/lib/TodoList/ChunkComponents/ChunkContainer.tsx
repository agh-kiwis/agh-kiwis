import { HStack } from '@chakra-ui/react';
import {
  DEFAULT_COLOR,
  INSIGNIFICANT_COLOR,
} from '@agh-kiwis/workspace-constants';

type ChunkContainerProps = {
  children: React.ReactNode;
  checked: boolean;
  color: string;
};

export const ChunkContainer: React.FC<ChunkContainerProps> = ({
  children,
  checked,
  color,
}) => {
  return (
    <HStack
      justifyContent="space-between"
      color="white"
      bgColor={checked ? INSIGNIFICANT_COLOR : color}
      borderRadius="0.5rem"
      px="2"
    >
      {children}
    </HStack>
  );
};
