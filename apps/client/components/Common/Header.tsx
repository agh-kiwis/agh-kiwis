import { Heading } from '@chakra-ui/react';
import React from 'react';

type HeaderProps = {
  text: string;
};

export const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <Heading textAlign={'center'} color="secondary" mb={4}>
      {text}
    </Heading>
  );
};
