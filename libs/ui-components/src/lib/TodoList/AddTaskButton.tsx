import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import { ADD_CONST_TASK_URL } from '@agh-kiwis/workspace-constants';

export const AddTaskButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      w={'100%'}
      bgColor={'primary'}
      color={'white'}
      onClick={() => router.push(ADD_CONST_TASK_URL)}
    >
      Add task
    </Button>
  );
};
