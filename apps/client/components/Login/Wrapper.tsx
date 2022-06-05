import { Container } from '@chakra-ui/layout';

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
    <Container mt={8} maxW={['300px', '400px', '500px', '600px']}>
      {children}
    </Container>
  );
};
