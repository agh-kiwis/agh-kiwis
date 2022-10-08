import React from 'react';
import { Flex } from '@chakra-ui/react';
import { PriorityIcon } from './PriorityIcon';
import { TaskName } from './TaskName';

type TaskHeaderProps = {
  name: string;
  priority: string;
};

export const TaskHeader: React.FC<TaskHeaderProps> = ({ name, priority }) => {
  return (
    <Flex justifyContent="center" align="center" pb="2">
      <TaskName name={name} />
      <PriorityIcon priority={priority} />
    </Flex>
  );
};
