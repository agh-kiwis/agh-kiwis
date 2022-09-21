import { Button } from '@chakra-ui/react';
import React from 'react';

type AddTaskProps = {
  router: any;
};

export const AddTask: React.FC<AddTaskProps> = ({ router }) => {
  return (
    <Button
      w={'100%'}
      h={'7vh'}
      mt={'3'}
      bgColor={'primary'}
      color={'white'}
      onClick={() => router.push('/add/const-task')}
    >
      {' '}
      Add task{' '}
    </Button>
  );
};
