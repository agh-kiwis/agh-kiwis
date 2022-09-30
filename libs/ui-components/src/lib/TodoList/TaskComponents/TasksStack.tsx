import React from 'react';
import { Stack } from '@chakra-ui/react';
import { GetTasksQuery } from '@agh-kiwis/data-access';
import { TaskTile } from './TaskTile';

type TasksStackProps = {
  data: GetTasksQuery;
};

export const TasksStack: React.FC<TasksStackProps> = ({ data }) => {
  return (
    <Stack overflowX="scroll" mb="6">
      {data?.getTasks.map((task, key) => (
        <TaskTile key={key} task={task} />
      ))}
    </Stack>
  );
};
