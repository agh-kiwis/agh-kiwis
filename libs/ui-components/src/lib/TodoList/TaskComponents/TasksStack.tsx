import React from 'react';
import { ScrollStack } from '../../Common/ScrollStack';
import { GetTasksQuery } from '@agh-kiwis/data-access';
import { SingleTask } from './SingleTask';

type TasksStackProps = {
  data: GetTasksQuery;
};

export const TasksStack: React.FC<TasksStackProps> = ({ data }) => {
  return (
    <ScrollStack h={'80vh'}>
      {data?.getTasks.map((task, key) => (
        <SingleTask key={key} task={task} />
      ))}
    </ScrollStack>
  );
};
