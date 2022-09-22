import { Task } from '@agh-kiwis/data-access';
import { useState } from 'react';
import { TaskContainer } from './TaskContainer';
import { TaskHeader } from './TaskHeader';
import { TaskInfo } from './TaskInfo';
import { TaskModal } from './TaskModal';

type TaskProps = {
  key: number;
  task: Task;
};

const taskColor = (task: Task) => {
  if (!task.isDone) return task.category.color.hexCode;
  else return 'secondary';
};

export const SingleTask: React.FC<TaskProps> = ({ task }) => {
  const [closeModal, openModal] = useState(false);
  return (
    <>
      <TaskContainer bgColor={taskColor(task)} onClick={() => openModal(true)}>
        <TaskHeader name={task.name} priority={task.priority.name} />
        <TaskInfo
          isFloat={task.isFloat}
          deadline={task.deadline}
          taskBreakdowns={task.taskBreakdowns}
        />
      </TaskContainer>

      <TaskModal
        isOpen={closeModal}
        task={task}
        close={() => openModal(false)}
      />
    </>
  );
};
