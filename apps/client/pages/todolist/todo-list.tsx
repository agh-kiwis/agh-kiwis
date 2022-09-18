import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetTasksQuery } from '@agh-kiwis/data-access';
import { FilterModal } from '../../components/Modals/FilterModal';
import { TodoListHeader } from '../../components/TodoList/TodoListHeader';
import { TasksStack } from '../../components/TodoList/TaskComponents/TasksStack';
import { AddTask } from '../../components/TodoList/AddTask';
import { AlertModal } from '@agh-kiwis/ui-components';

export const TodoList = () => {
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
