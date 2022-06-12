import React from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Logo: React.FC = () => {
  return (
    <VStack my={4} color="primary">
      <FontAwesomeIcon icon={faKiwiBird} fontSize="100" />
      <Heading textAlign={'center'} color="secondary">
        agh kiwis
      </Heading>
    </VStack>
  );
};
