import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { PriorityIcon } from './PriorityIcon';
import { TaskName } from './TaskName';

type TaskHeaderProps = {
  name: string;
  priority: string;
};

export const TaskHeader: React.FC<TaskHeaderProps> = ({ name, priority }) => {
  return (
    <HStack justifyContent="center" align="center" pb="2">
      <TaskName name={name} />
      <Box w="24px" h="24px">
        <PriorityIcon priority={priority} />
      </Box>
    </HStack>
  );
};
