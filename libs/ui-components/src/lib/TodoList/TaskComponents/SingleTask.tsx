import { useState } from 'react';
import { Task } from '@agh-kiwis/data-access';
import { INSIGNIFICANT_COLOR } from '@agh-kiwis/workspace-constants';
import { TaskContainer } from './TaskContainer';
import { TaskHeader } from './TaskHeader';
import { TaskInfo } from './TaskInfo';
import { TaskModal } from './TaskModal';

type SingleTaskProps = {
  task: Task;
};

export const SingleTask: React.FC<SingleTaskProps> = ({ task }) => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <TaskContainer
        bgColor={getTaskColor(task)}
        onClick={() => setModalOpened(true)}
      >
        <TaskHeader name={task.name} priority={task.priority} />
        <TaskInfo
          isDone={task.isDone}
          isFloat={task.isFloat}
          deadline={task.deadline}
          taskBreakdowns={task.taskBreakdowns}
        />
      </TaskContainer>

      <TaskModal
        isOpen={modalOpened}
        task={task}
        close={() => setModalOpened(false)}
      />
    </>
  );
};

const getTaskColor = (task: Task) => {
  return task.isDone ? INSIGNIFICANT_COLOR : task.category.color.hexCode;
};
