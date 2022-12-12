import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '@agh-kiwis/data-access';
import { setCurrentTask } from '@agh-kiwis/redux';
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
  const dispatch = useDispatch();

  return (
    <>
      <TaskContainer
        bgColor={getTaskColor(task)}
        onClick={() => {
          setModalOpened(true);
          dispatch(setCurrentTask(task));
        }}
      >
        <TaskHeader name={task.name} priority={task.priority} />
        <TaskInfo
          chunkInfo={task.chunkInfo}
          isDone={task.isDone}
          isFloat={task.isFloat}
          deadline={task.chunkInfo?.deadline}
          chunks={task.chunks}
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
