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
  variant,
  type,
  isLoading,
  onClick,
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      isLoading={isLoading}
      w={'100%'}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};
