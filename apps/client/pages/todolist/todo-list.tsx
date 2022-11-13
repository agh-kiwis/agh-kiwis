import { useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import { useGetTasksQuery } from '@agh-kiwis/data-access';
import {
  CommonButton,
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

  const [filterOptions, setFilterOptions] = useState<MappedFilter>(
    mapToGraphQLFields(
      { type: undefined, status: undefined, category: [], priority: [] },
      filters
    )
  );

  const { data, loading, error } = useGetTasksQuery({
    variables: {
      getTasksInput: {
        limit: 20,
        offset: 0,
        filterOptions: {
          isDone: filterOptions.status,
          isFloat: filterOptions.type,
          category: filterOptions.category,
          priority: filterOptions.priority,
        },
      },
    },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <AlertModal status={'error'} title={'Error!'} message={error.message} />
    );
  }

  return (
    <>
      <TodoListHeader setOpen={setOpen} />
      <TasksStack data={data} />
      <CommonButton
        buttonText="Add Task"
        onClick={() => router.push(ADD_CONST_TASK_URL)}
      />
      <FilterModal
        filters={filters}
        setFilters={setFilters}
        isOpen={open}
        close={() => setOpen(false)}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
    </>
  );
};

export default TodoList;
