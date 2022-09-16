import { Stack, Text, Box } from '@chakra-ui/react';
import { timeInterval, startToDate } from '../DateConvertor';
import React from 'react';
import { TaskBreakdown } from '@agh-kiwis/data-access';

type ChunkInfoProps = {
  checked: boolean;
  id: number;
  breakdown: TaskBreakdown;
};

export const ChunkInfo: React.FC<ChunkInfoProps> = ({
  id,
  breakdown,
  checked,
}) => {
  if (checked) {
    return (
      <Stack justifyContent={'center'}>
        <Text mr="1rem">Chunk {id + 1}</Text>
        <Text>Done</Text>
      </Stack>
    );
  } else {
    return (
      <Stack justifyContent={'center'}>
        <Text mr="1rem">Chunk {id + 1}</Text>
        <Box>
          <Text mr="1rem"> {startToDate(breakdown.start)} </Text>
          <Text>{timeInterval(breakdown)}</Text>
        </Box>
      </Stack>
    );
  }
};
