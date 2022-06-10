import { Button, Image } from '@chakra-ui/react';
import React from 'react';

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
      <Image
        w="18px"
        mx={2}
        alt="Google sign-in"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
      />
      {buttonText}
    </Button>
  );
};
