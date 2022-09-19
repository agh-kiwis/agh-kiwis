import React from 'react';
import { Heading } from '@chakra-ui/react';

type HeaderProps = {
  text: string;
};

export const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <Heading textAlign={'center'} color="secondary">
      {text}
    </Heading>
  );
};
