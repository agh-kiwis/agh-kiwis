import { Task } from './Task';
import { GetTasksQuery } from '@agh-kiwis/data-access';

import React from 'react';
import { ScrollStack } from '../../Common/ScrollStack';

type TasksStackProps = {
  data: GetTasksQuery;
};

export const TasksStack: React.FC<TasksStackProps> = ({ data }) => {
  return (
    <ScrollStack h={'80vh'}>
      {data?.getTasks.map((task, key) => (
        <Task key={key} task={task} />
      ))}
    </ScrollStack>
  );
};
