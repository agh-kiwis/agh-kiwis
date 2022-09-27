import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

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
