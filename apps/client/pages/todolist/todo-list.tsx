import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetTasksQuery } from '@agh-kiwis/data-access';
import {
  AddTask,
  AlertModal,
  FilterModal,
  TasksStack,
  TodoListHeader,
} from '@agh-kiwis/ui-components';

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
      <AddTask router={router} />
      <FilterModal isOpen={open} close={() => setOpen(false)} />
    </>
  );
};

export default TodoList;
