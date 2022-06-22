import { Text, Icon, Stack, Flex } from '@chakra-ui/react';
import { IoTimerOutline, IoCalendarClearOutline } from 'react-icons/io5';
import { useState } from 'react';
import { TaskModal } from '../Modals/TaskModal';
import moment from 'moment';
import PriorityIcon from './PriorityIcon';

// TODO Change deadline data type from Unix Millisecond Timestamp to Date
const deadlineConvert = (deadline: number) => {
  return moment(deadline, 'x').format('DD MMM');
};

const timeConvert = (start: moment.Moment) => {
  return moment(start).format('HH:mm');
};

const timeInterval = (breakdown: any) => {
  const start = timeConvert(breakdown.start);
  const end = timeConvert(moment(breakdown.start).add(breakdown.duration));
  return start + " - " + end;
}

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
          justifyContent="center"
          paddingBottom="0.5rem"
        >
          <Text
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            fontSize="2xl"
          >
            {props.task.name}
          </Text>
          <PriorityIcon priority={props.task.priority.name} marginRight="auto" />
        </Flex>

        <Flex justifyContent={'center'} paddingBottom={'0.5rem'}>
          {props.task.isFloat ?
            (
              <Flex>
                <Icon as={IoCalendarClearOutline} fontSize="2xl" marginRight="0.5rem" />
                <Text>{deadlineConvert(props.task.deadline)}</Text>
              </Flex>) :
            (
              <Flex>
                <Icon as={IoTimerOutline} fontSize="2xl" marginRight="0.5rem" />
                <Text>{timeInterval(props.task.taskBreakdowns[0])}</Text>
              </Flex>
            )
          }
        </Flex>

        {props.task.isFloat ? (
          <Flex justifyContent={'center'} paddingBottom={'0.5rem'}>
            <Text fontSize="md">Chunks done: 0/{props.task.taskBreakdowns.length}</Text>
          </Flex>
        ) : null}
      </Stack>
      <TaskModal
        isOpen={closeModal}
        task={props.task}
        timeConvert={timeConvert}
        deadline={deadlineConvert(props.task.deadline)}
        timeInterval={timeInterval}
        close={() => openModal(false)}
      />
    </>
  );
};
