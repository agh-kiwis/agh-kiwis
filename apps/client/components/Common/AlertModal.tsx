import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import React from 'react';

type AlertProps = {
  message: string;
};

export const AlertModal: React.FC<AlertProps> = ({ message }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
