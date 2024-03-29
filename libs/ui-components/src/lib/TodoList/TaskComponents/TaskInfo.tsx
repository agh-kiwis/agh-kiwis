import React, { useEffect, useState } from 'react';
import { IoCalendarClearOutline, IoTimerOutline } from 'react-icons/io5';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { Chunk, ChunkInfo, Maybe } from '@agh-kiwis/data-access';
import { deadlineToDate, timeInterval } from '@agh-kiwis/moment-service';
import { TaskIcon } from './TaskIcon';

type TaskInfoProps = {
  isDone: boolean;
  isFloat: boolean;
  deadline: string;
  chunks: Chunk[];
  chunkInfo: ChunkInfo;
};

export const TaskInfo: React.FC<TaskInfoProps> = ({
  isDone,
  chunkInfo,
  isFloat,
  deadline,
  chunks,
}) => {
  const [doneChunksNumber, setDoneChunksNumber] = useState(0);
  const [allChunksNumber, setAllChunksNumber] = useState(chunks?.length);

  useEffect(() => {
    const doneChunks: number = chunks?.filter((chunk) => {
      return chunk.isDone === true;
    }).length;

    setDoneChunksNumber(doneChunks);
  }, [chunks]);

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
              ? `${doneChunksNumber}/${allChunksNumber}`
              : `${allChunksNumber}/${allChunksNumber}`}
          </Text>
        </Flex>
      </Stack>
    );
  } else {
    return (
      <Flex justifyContent="center">
        <TaskIcon icon={IoTimerOutline} />
        <Text>{timeInterval(chunkInfo.start, chunkInfo.duration)}</Text>
      </Flex>
    );
  }
};
