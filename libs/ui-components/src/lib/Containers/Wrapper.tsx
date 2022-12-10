import { Container } from '@chakra-ui/layout';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
  children: React.ReactNode;
  height?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, height }) => {
  return (
    <Container
      py={8}
      maxW={['350px', '400px', '500px', '600px']}
      height={height}
    >
      {children}
    </Container>
  );
};
