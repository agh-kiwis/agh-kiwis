import { Text } from "@chakra-ui/react"
import { Icon } from '@chakra-ui/react';
import { HiChevronDoubleUp } from "react-icons/hi";
import { IoTimerOutline } from "react-icons/io5";
import styles from '../../styles/Task.module.css';
import { useState } from 'react';
import { TaskModal } from "../Modals/TaskModal";


export const Task = () => {
    const [closeModal, openModal] = useState(false);
    return (
        <>
        <button className={styles.container} onClick={() => openModal(true)}>
            <div className={styles.taskHead}>
                <p className={styles.text}>Go for a walk</p>
                <Icon as={HiChevronDoubleUp}
                fontSize="2xl"
                position="absolute"
                right="0"
                 />
            </div>
            <div className={styles.center}>
                <Text fontSize="xl"> <Icon as={IoTimerOutline} /> 12 Aug</Text>
            </div>
            <div className={styles.chunkHandle}>
                <Text fontSize="md">Chunks done: 1/5</Text>
            </div>
        </button>
        <TaskModal isOpen={closeModal} close={() => openModal(false)} />
    </>
    )
}