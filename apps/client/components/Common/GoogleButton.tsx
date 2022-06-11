import React from 'react';
import Image from 'next/image';
import { Button, Wrap, WrapItem } from '@chakra-ui/react';

type ButtonProps = {
  buttonText: string;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
};

export const GoogleButton: React.FC<ButtonProps> = ({
  buttonText,
  type,
  isLoading,
}) => {
  return (
    <Button variant="outline" type={type} isLoading={isLoading} w={'100%'}>
      <Wrap spacing="8px">
        <WrapItem>
          <Image
            width="18px"
            height="18px"
            alt="Google sign-in"
            src="/google.png"
          />
        </WrapItem>
        <WrapItem>{buttonText}</WrapItem>
      </Wrap>
    </Button>
  );
};
