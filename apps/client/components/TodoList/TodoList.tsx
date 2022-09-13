import {
  Box,
  Button,
  Stack,
  Text,
  Icon,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
} from '@chakra-ui/react';
import { HiFilter } from 'react-icons/hi';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetTasksQuery } from '@agh-kiwis/data-access';
import { FilterModal } from '../Modals/FilterModal';
import { Task } from './Task';
import { Header } from '../Common/Header';
import { CommonButton } from '../Buttons/CommonButton';

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
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }
  return (
    <>
      <HStack mb={4} justifyContent={'space-around'}>
        <Header text="Tasks to do" />

        <Button backgroundColor="secondary" onClick={() => setOpen(true)}>
          <Icon as={HiFilter} />
        </Button>
      </HStack>

      <Stack overflowX="scroll" height="80vh" position="relative">
        {data?.getTasks.map((task, key) => (
          <Task key={key} task={task} />
        ))}
        {/* <Box position="absolute" right="5rem" bottom="5rem">
          <Icon
            as={HiOutlinePlusCircle}
            fontSize="70px"
            color="primary"
            borderRadius="100%"
            backgroundColor="white"
            position="fixed"
            onClick={() => router.push('/add/const-task')}
          />
        </Box> */}
      </Stack>
      <Box mt={4}>
        <CommonButton
          variant="outline"
          buttonText="Add new task"
          onClick={() => router.push('/add/const-task')}
        />
      </Box>
      <FilterModal isOpen={open} close={() => setOpen(false)} />
    </>
  );
};
