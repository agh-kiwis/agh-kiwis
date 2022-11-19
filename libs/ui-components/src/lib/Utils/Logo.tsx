import React from 'react';
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Heading, VStack } from '@chakra-ui/react';

type LogoProps = {
  textVisible?: boolean;
};

export const Logo: React.FC<LogoProps> = ({ textVisible = true }) => {
  return (
    <VStack my={4} color="primary">
      <FontAwesomeIcon icon={faKiwiBird} fontSize="100" />
      {textVisible && (
        <Heading textAlign="center" color="secondary">
          agh kiwis
        </Heading>
      )}
    </VStack>
  );
};
