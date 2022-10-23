import React from 'react';
import { Heading } from '@chakra-ui/react';

type HeaderProps = {
  text: string;
  size: string;
};

export const Header: React.FC<HeaderProps> = ({ text, size }) => {
  return (
    <Heading textAlign="center" color="secondary" size={size}>
      {text}
    </Heading>
  );
};
