import React from 'react';
import { Task } from '@agh-kiwis/data-access';
import { ScrollStack } from '../../Common/ScrollStack';
import { SingleTask } from './SingleTask';

type TasksStackProps = {
  tasks: Task[];
};

export const TasksStack: React.FC<TasksStackProps> = ({ tasks }) => {
  return (
    <ScrollStack height="82%">
      {tasks.map((task, key) => (
        <SingleTask key={key} task={task} />
      ))}
    </ScrollStack>
  );
};
