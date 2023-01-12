import React from 'react';
import router from 'next/router';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import {
  ADD_TASK_ERROR,
  CHANGE_PARAMETERS,
  EDIT_SCHEDULE,
} from '@agh-kiwis/workspace-constants';

type ErrorModalProps = {
  isOpen: boolean;
  cancelRef: any;
  onClose: () => void;
  message: string;
};

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  cancelRef,
  onClose,
  message,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      isCentered
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent mx="4">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {ADD_TASK_ERROR}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {CHANGE_PARAMETERS}
            </Button>
            <Button
              colorScheme={'gray'}
              onClick={() => router.push('/todo-list')}
              ml={3}
            >
              {EDIT_SCHEDULE}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
