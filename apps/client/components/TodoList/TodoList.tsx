import { Box, Button, Stack, Text, Icon, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, } from '@chakra-ui/react';
import { HiFilter, HiOutlinePlusCircle } from 'react-icons/hi';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetTasksQuery } from '@agh-kiwis/data-access';
import { FilterModal } from '../Modals/FilterModal';
import { Task } from './Task';

export const TodoList = () => {
  const router = useRouter();
  const { data, loading, error } = useGetTasksQuery({
    variables: {
      getTasksInput: {
        limit: 20,
        offset: 0,
        filterOptions: {
        },
      },
    },
  });

  const [open, setOpen] = useState(false);
  if (loading) {
    return (<Spinner />)
  }
  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }
  return (
    <>
      <Stack paddingBottom="2rem" color="white" display="flex" flexDirection="row" justifyContent={"space-around"}>
        <Text fontSize="3xl" color="blue.600"> Tasks to do </Text>
        <Button backgroundColor="gray.400" onClick={() => setOpen(true)}>
          <Icon as={HiFilter} />
        </Button>
      </Stack>

      <Stack overflowX="scroll" height="80vh" position="relative">
        {data?.getTasks.map((task, key) => (
          <Task key={key} task={task} />
        ))}
        <Box position="absolute" right="8rem" bottom="8rem">
          <Icon as={HiOutlinePlusCircle}
            fontSize="100"
            borderRadius="3rem"
            backgroundColor="white"
            color="blue.600"
            position="fixed"
            onClick={() => router.push('/add/float-task')} />
        </Box>
      </Stack>
      <FilterModal isOpen={open} close={() => setOpen(false)} />
    </>
  );
};
