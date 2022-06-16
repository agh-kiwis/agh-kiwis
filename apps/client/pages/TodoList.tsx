import { Button, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Task } from '../components/TodoList/Task';
import styles from '../styles/Todolist.module.css';
import { FilterModal } from '../components/Modals/FilterModal';
import { useEffect, useState } from 'react';
import { useGetTasksQuery } from '@agh-kiwis/data-access';

export const TodoList = () => {
  // TODO
  const { data, loading, error } = useGetTasksQuery({
    variables: {
      getTasksInput: {
        limit: 20,
        offset: 0,
        filterOptions: {
          isDone: false,
          isFloat: false,
        },
      },
    },
  });

  useEffect(() => {
    console.log(data);
    console.log(loading);
    console.log(error);
  }, [data, loading, error]);

  const [closeFilter, openFilter] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <Text fontSize="3xl" color="blue.600">
          Tasks to do
        </Text>
        <Button
          className={styles.ttr}
          colorScheme="gray"
          onClick={() => openFilter(true)}
        >
          <Icon as={FaFilter} />
        </Button>
      </div>
      <div className={styles.tasksKeeper}>
        {/* TODO Add for loop */}
        <Task />
        <Task />
        <Task />
        <Task />
        <button className={styles.plus}>
          <Icon as={IoAddCircleOutline} fontSize="100" color="blue.600"></Icon>
        </button>
      </div>
      <FilterModal isOpen={closeFilter} close={() => openFilter(false)} />
    </>
  );
};
