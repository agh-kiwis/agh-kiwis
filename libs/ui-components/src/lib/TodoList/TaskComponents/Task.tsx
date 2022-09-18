import { useState } from 'react';
import { TaskModal } from './TaskModal';
import { TaskContainer } from './TaskContainer';
import { TaskHeader } from './TaskHeader';
import { TaskInfo } from './TaskInfo';

const taskColor = (props) => {
  if (!props.task.isDone) return props.task.category.color.hexCode;
  else return 'secondary';
};

export const Task = (props) => {
  const [closeModal, openModal] = useState(false);
  const task = props.task;
  return (
    <>
      <TaskContainer bgColor={taskColor(props)} onClick={() => openModal(true)}>
        <TaskHeader name={task.name} priority={task.priority.name} />
        <TaskInfo
          isFloat={task.isFloat}
          deadline={task.deadline}
          taskBreakdowns={task.taskBreakdowns}
        />
      </TaskContainer>

      <TaskModal
        isOpen={closeModal}
        task={props.task}
        close={() => openModal(false)}
      />
    </>
  );
};
