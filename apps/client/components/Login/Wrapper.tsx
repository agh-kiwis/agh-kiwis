import { Box } from '@chakra-ui/layout';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === 'regular' ? '1000px' : '10px'}
      w="100%"
    >
      {children}
    </Box>
  );
};
