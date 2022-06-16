import { Button, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import {IoAddCircleOutline} from 'react-icons/io5';
import { Task } from '../components/TodoList/Task';
import styles from '../styles/Todolist.module.css';
import {FilterModal} from "../components/Modals/FilterModal"
import { useState } from 'react';



export const TodoList = () => {
    const [closeFilter, openFilter] = useState(false);
    return (
        <>
        <div className={styles.container}>
            <Text 
                fontSize="3xl"
                color="blue.600">
                    Tasks to do
            </Text>
            <Button className={styles.ttr}
                colorScheme="gray"
                onClick={() => openFilter(true)}
            >
                <Icon as={FaFilter} />
            </Button>
        </div>
        <div className={styles.tasksKeeper}>
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
    )
}