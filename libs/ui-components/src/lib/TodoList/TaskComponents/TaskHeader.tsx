import { Flex } from '@chakra-ui/react';
import { TaskName } from './TaskName';
import { PriorityIcon } from './PriorityIcon';

import React from 'react';

type TaskHeaderProps = {
  name: string;
  priority: string;
};

export const TaskHeader: React.FC<TaskHeaderProps> = ({ name, priority }) => {
  return (
    <Flex justifyContent={'center'} pb={'2'} align={'center'}>
      <TaskName name={name} />
      <PriorityIcon priority={priority} />
    </Flex>
  );
};
