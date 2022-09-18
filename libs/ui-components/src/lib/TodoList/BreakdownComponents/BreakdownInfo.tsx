import React from 'react';
import { Stack, Text, Box } from '@chakra-ui/react';
import { TaskBreakdown } from '@agh-kiwis/data-access';
import { startToDate, timeInterval } from '@agh-kiwis/moment-service';

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
