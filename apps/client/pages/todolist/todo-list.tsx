import { useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import { useGetTasksQuery } from '@agh-kiwis/data-access';
import { CommonButton } from '@agh-kiwis/ui-components';
import {
  AlertModal,
  FilterModal,
  TasksStack,
  TodoListHeader,
} from '@agh-kiwis/ui-components';
import { ADD_CONST_TASK_URL } from '@agh-kiwis/workspace-constants';

const TodoList: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useGetTasksQuery({
    variables: {
      getTasksInput: {
        limit: 20,
        offset: 0,
        filterOptions: {},
      },
    },
  });

  const [open, setOpen] = useState(false);
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    router.push('/login');
    return (
      <AlertModal status={'error'} title={'Error!'} message={error.message} />
    );
  }
  return (
    <>
      <TodoListHeader setOpen={setOpen} />
      <TasksStack data={data} />
      <CommonButton buttonText='Add Task' onClick={() => router.push(ADD_CONST_TASK_URL)} />
      <FilterModal isOpen={open} close={() => setOpen(false)} />
    </>
  );
};

export default TodoList;
