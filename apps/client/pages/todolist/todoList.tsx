import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetTasksQuery } from '@agh-kiwis/data-access';
import { FilterModal } from 'apps/client/components/Modals/FilterModal';
import { AlertModal } from 'apps/client/components/Common/AlertModal';
import { TodoListHeader } from 'apps/client/components/TodoList/TodoListHeader';
import { TasksStack } from 'apps/client/components/TodoList/TaskComponents/TasksStack';
import { AddTask } from 'apps/client/components/TodoList/AddTask';

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
