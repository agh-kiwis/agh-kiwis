import { HStack, Button, Icon } from '@chakra-ui/react';
import { HiFilter } from 'react-icons/hi';
import { Header } from '../Common/Header';
import React from 'react';

type TodoListHeaderProps = {
  setOpen: (isOpen: boolean) => void;
};

export const TodoListHeader: React.FC<TodoListHeaderProps> = ({ setOpen }) => {
  return (
    <HStack mb={'5'} justifyContent={'space-around'}>
      <Header text="Tasks to do" />
      <Button bgColor={'secondary'} onClick={() => setOpen(true)}>
        <Icon as={HiFilter} />
      </Button>
    </HStack>
  );
};
