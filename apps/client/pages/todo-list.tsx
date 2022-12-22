import { useState } from 'react';
import { HiOutlineCalendar } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { HStack, VStack } from '@chakra-ui/react';
import { useGetTasksQuery } from '@agh-kiwis/data-access';
import {
  AlertModal,
  CommonButton,
  CustomSpinner,
  FilterModal,
  MappedFilter,
  TasksStack,
  TodoListHeader,
  Wrapper,
  mapToGraphQLFields,
  useFilters,
} from '@agh-kiwis/ui-components';
import {
  ADD_CONST_TASK_URL,
  CALENDAR_URL,
  SETTINGS_URL,
} from '@agh-kiwis/workspace-constants';

const TodoList: React.FC = () => {
  const router = useRouter();

  // TODO This can sit in local storage

  const [open, setOpen] = useState(false);
  const { filters, setFilters } = useFilters();

  const [mappedFilter, setMappedFilter] = useState<MappedFilter>(
    mapToGraphQLFields(
      {
        type: undefined,
        status: undefined,
        categories: [],
        priorities: [],
        repeat: undefined,
      },
      filters
    )
  );

  const { data, loading, error } = useGetTasksQuery({
    variables: {
      getTasksInput: {
        limit: 30,
        offset: 0,
        filterOptions: {
          isDone: mappedFilter.status,
          isFloat: mappedFilter.type,
          category: mappedFilter.categories,
          priority: mappedFilter.priorities,
          repeat: mappedFilter.repeat,
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
      return <></>;
    } else {
      return (
        <AlertModal status={'error'} title={'Error!'} message={error.message} />
      );
    }
  }

  return (
    <Wrapper height="100vh">
      <TodoListHeader setOpen={setOpen} />
      <TasksStack tasks={data.getTasks} />

      <VStack align="stretch" w="100%">
        <HStack>
          <CommonButton
            buttonText="Add Task"
            onClick={() => router.push(ADD_CONST_TASK_URL)}
          />
        </HStack>
        <HStack>
          <CommonButton
            variant="outline"
            icon={HiOutlineCalendar}
            onClick={() => router.push(CALENDAR_URL)}
          />
          <CommonButton
            variant="outline"
            icon={IoSettingsOutline}
            onClick={() => router.push(SETTINGS_URL)}
          />
        </HStack>
      </VStack>
      <FilterModal
        filters={filters}
        setFilters={setFilters}
        isOpen={open}
        close={() => setOpen(false)}
        mappedFilter={mappedFilter}
        setMappedFilter={setMappedFilter}
      />
    </Wrapper>
  );
};

export default TodoList;
