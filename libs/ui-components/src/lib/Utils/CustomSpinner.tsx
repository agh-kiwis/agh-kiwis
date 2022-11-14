import { Flex, Spinner } from '@chakra-ui/react';
import { Wrapper } from '../Containers/Wrapper';
import { Logo } from './Logo';

export const CustomSpinner: React.FC = () => {
  return (
    <Wrapper>
      <Logo textVisible={true} />
      <Flex h="20vh" justifyContent="center" align="center">
        <Spinner
          thickness="4px"
          emptyColor="gray.200"
          color="green"
          size="xl"
        />
      </Flex>
    </Wrapper>
  );
};
