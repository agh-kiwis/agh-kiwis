import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetTasksQuery } from '@agh-kiwis/data-access';
import {
  CommonButton,
  CustomSpinner,
  MappedFilter,
  mapToGraphQLFields,
  useFilters,
} from '@agh-kiwis/ui-components';
import {
  AlertModal,
  FilterModal,
  TasksStack,
  TodoListHeader,
} from '@agh-kiwis/ui-components';
import { ADD_CONST_TASK_URL } from '@agh-kiwis/workspace-constants';

const TodoList: React.FC = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { filters, setFilters } = useFilters();

  const [mappedFilter, setMappedFilter] = useState<MappedFilter>(
    mapToGraphQLFields(
      { type: undefined, status: undefined, categories: [], priorities: [] },
      filters
    )
  );

  const { data, loading, error } = useGetTasksQuery({
    variables: {
      getTasksInput: {
        limit: 20,
        offset: 0,
        filterOptions: {
          isDone: mappedFilter.status,
          isFloat: mappedFilter.type,
          category: mappedFilter.categories,
          priority: mappedFilter.priorities,
        },
      },
    },
  });

  if (loading) {
    return <CustomSpinner />;
  }
  if (error) {
    if (error.message.includes('Authentication failed')) {
      router.push('/login');
    }
    return (
      <AlertModal status={'error'} title={'Error!'} message={error.message} />
    );
  }

  return (
    <>
      <TodoListHeader setOpen={setOpen} />
      <TasksStack tasks={data.getTasks} />
      <CommonButton
        buttonText="Add Task"
        onClick={() => router.push(ADD_CONST_TASK_URL)}
      />
      <FilterModal
        filters={filters}
        setFilters={setFilters}
        isOpen={open}
        close={() => setOpen(false)}
        mappedFilter={mappedFilter}
        setMappedFilter={setMappedFilter}
      />
    </>
  );
};

export default TodoList;
