import React from 'react';
import { Button } from '@chakra-ui/react';
import { ADD_CONST_TASK_URL } from '@agh-kiwis/workspace-constants';

type AddTaskProps = {
  router: any;
};

export const AddTask: React.FC<AddTaskProps> = ({ router }) => {
  return (
    <Button
      w={'100%'}
      bgColor={'primary'}
      color={'white'}
      onClick={() => router.push(ADD_CONST_TASK_URL)}
    >
      {' '}
      Add task{' '}
    </Button>
  );
};
