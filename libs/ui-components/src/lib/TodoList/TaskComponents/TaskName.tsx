import React from 'react';
import { Text } from '@chakra-ui/react';

type TaskNameProps = {
  name: string;
};

export const TaskName: React.FC<TaskNameProps> = ({ name }) => {
  return (
    <Text
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      overflow="hidden"
      fontSize="2xl"
    >
      {name}
    </Text>
  );
};
