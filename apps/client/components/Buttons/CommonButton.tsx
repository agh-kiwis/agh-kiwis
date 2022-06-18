import { Button } from '@chakra-ui/react';
import React from 'react';

type ButtonProps = {
  buttonText: string;
  variant: string;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  onClick?: () => void;
};

export const CommonButton: React.FC<ButtonProps> = ({
  buttonText,
  ...props
}) => {
  return (
    <Button {...props} w={'100%'}>
      {buttonText}
    </Button>
  );
};
