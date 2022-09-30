import React from 'react';
import { IoCalendarClearOutline, IoTimerOutline } from 'react-icons/io5';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { Maybe, TaskBreakdown } from '@agh-kiwis/data-access';
import { deadlineToDate, timeInterval } from '@agh-kiwis/moment-service';
import { TaskIcon } from './TaskIcon';

type TaskInfoProps = {
  isFloat: boolean;
  deadline: Maybe<string> | undefined;
  taskBreakdowns: Maybe<TaskBreakdown[]> | undefined;
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
