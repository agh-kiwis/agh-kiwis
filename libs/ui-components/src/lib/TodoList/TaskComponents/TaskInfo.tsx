import React, { useEffect, useState } from 'react';
import { IoCalendarClearOutline, IoTimerOutline } from 'react-icons/io5';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { Maybe, TaskBreakdown } from '@agh-kiwis/data-access';
import { deadlineToDate, timeInterval } from '@agh-kiwis/moment-service';
import { TaskIcon } from './TaskIcon';

type TaskInfoProps = {
  isDone: boolean;
  isFloat: boolean;
  deadline: Maybe<string> | undefined;
  taskBreakdowns: Maybe<TaskBreakdown[]> | undefined;
};

export const TaskInfo: React.FC<TaskInfoProps> = ({
  isDone,
  isFloat,
  deadline,
  taskBreakdowns,
}) => {
  const [doneBreakdownsNumber, setDoneBreakdownsNumber] = useState(0);
  const [allBreakdownsNumber, setAllBreakdownsNumber] = useState(
    taskBreakdowns?.length
  );

  useEffect(() => {
    const doneBreakdowns: number = taskBreakdowns?.filter((chunk) => {
      return chunk.isDone === true;
    }).length;

    doneBreakdownsNumber
      ? setDoneBreakdownsNumber(doneBreakdowns)
      : setDoneBreakdownsNumber(0);
  }, [taskBreakdowns]);

  if (isFloat) {
    return (
      <Stack justifyContent="center">
        <Flex justifyContent="center">
          <TaskIcon icon={IoCalendarClearOutline} />
          <Text>{deadlineToDate(deadline!)}</Text>
        </Flex>
        <Flex justifyContent="center">
          <Text fontSize="md">
            Chunks done:{' '}
            {!isDone
              ? `${doneBreakdownsNumber}/${allBreakdownsNumber}`
              : `${allBreakdownsNumber}/${allBreakdownsNumber}`}
          </Text>
        </Flex>
      </Stack>
    );
  } else {
    return (
      <Flex justifyContent="center">
        <TaskIcon icon={IoTimerOutline} />
        <Text>{timeInterval(taskBreakdowns && taskBreakdowns[0])}</Text>
      </Flex>
    );
  }
};
