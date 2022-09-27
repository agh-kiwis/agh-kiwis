import React from 'react';
import { Stack } from '@chakra-ui/react';
import { GetTasksQuery } from '@agh-kiwis/data-access';
import { Task } from './Task';

type TasksStackProps = {
  data: GetTasksQuery;
};

export const TasksStack: React.FC<TasksStackProps> = ({ data }) => {
  return (
    <Stack overflowX="scroll" mb={'6'}>
      {data?.getTasks.map((task, key) => (
        <Task key={key} task={task} />
      ))}
    </Stack>
  );
};
