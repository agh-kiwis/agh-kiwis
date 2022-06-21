import { Text, Icon, Stack, Flex } from '@chakra-ui/react';
import { IoTimerOutline } from 'react-icons/io5';
import { useState } from 'react';
import { TaskModal } from '../Modals/TaskModal';
import moment from 'moment';
import PriorityIcon from './PriorityIcon';

// TODO Change deadline data type from Unix Millisecond Timestamp to Date
const dataConvert = (milliseconds: number) => {
  return moment(milliseconds, 'x').format('DD MMM');
};

export type TaskProps = any;

export const Task = (props: TaskProps) => {
  const [closeModal, openModal] = useState(false);
  return (
    <>
      <Stack
        backgroundColor={
          !props.task.isDone ? props.task.category.color.hexCode : 'gray.400'
        }
        borderRadius="0.7rem"
        padding="2rem"
        color="white"
        width="100%"
        onClick={() => openModal(true)}
      >
        <Flex
          flex="1"
          justifyContent="center"
          paddingBottom="0.5rem"
          position="relative"
        >
          <Text
            textOverflow="ellipsis"
            position="relative"
            whiteSpace="nowrap"
            overflow="hidden"
            fontSize="2xl"
          >
            {props.task.name}
          </Text>
          <PriorityIcon priority={props.task.priority.name} />
        </Flex>

        {!props.task.isFloat ? null : (
          <Flex justifyContent={'center'} paddingBottom={'0.5rem'}>
            <Text fontSize="xl">
              <Icon as={IoTimerOutline} />
              {dataConvert(props.task.deadline)}
            </Text>
          </Flex>
        )}

        <Flex justifyContent={'center'} paddingBottom={'0.5rem'}>
          <Text fontSize="md">{props.task.name}</Text>
        </Flex>
      </Stack>
      <TaskModal
        isOpen={closeModal}
        task={props.task}
        close={() => openModal(false)}
      />
    </>
  );
};
