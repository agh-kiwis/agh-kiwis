import React from 'react';
import { IoTimerOutline, IoCalendarClearOutline } from 'react-icons/io5';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { TaskBreakdown } from '@agh-kiwis/data-access';
import { TaskIcon } from './TaskIcon';
import { deadlineToDate, timeInterval } from '@agh-kiwis/moment-service';

type TaskInfoProps = {
  isFloat: boolean;
  deadline: number;
  taskBreakdowns: TaskBreakdown[];
};

const doneChunks = (taskBreakdowns: TaskBreakdown[]) => {
  return taskBreakdowns.filter((chunk) => {
    return chunk.isDone === true;
  }).length;
};

export const TaskInfo: React.FC<TaskInfoProps> = ({
  isFloat,
  deadline,
  taskBreakdowns,
}) => {
  if (isFloat) {
    return (
      <Stack justifyContent={'center'}>
        <Flex justifyContent={'center'}>
          <TaskIcon icon={IoCalendarClearOutline} />
          <Text>{deadlineToDate(deadline)}</Text>
        </Flex>
        <Flex justifyContent={'center'}>
          <Text fontSize="md">
            Chunks done: {doneChunks(taskBreakdowns)}/{taskBreakdowns.length}
          </Text>
        </Flex>
      </Stack>
    );
  } else {
    return (
      <Flex justifyContent={'center'}>
        <TaskIcon icon={IoTimerOutline} />
        <Text>{timeInterval(taskBreakdowns[0])}</Text>
      </Flex>
    );
  }
};
