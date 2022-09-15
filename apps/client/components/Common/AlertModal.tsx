import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import React from 'react';

type AlertProps = {
  status: 'info' | 'warning' | 'success' | 'error' | 'loading';
  title: string;
  message: string;
};

export const AlertModal: React.FC<AlertProps> = ({
  message,
  status,
  title,
}) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
