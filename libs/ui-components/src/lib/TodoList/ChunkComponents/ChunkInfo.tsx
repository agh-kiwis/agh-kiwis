import React from 'react';
import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { Chunk } from '@agh-kiwis/data-access';
import { startToDate, timeInterval } from '@agh-kiwis/moment-service';

type ChunkInfoProps = {
  checked: boolean;
  id: number;
  chunk: Chunk;
};

export const ChunkInfo: React.FC<ChunkInfoProps> = ({ id, chunk, checked }) => {
  if (checked) {
    return (
      <HStack justifyContent="center" spacing="8" h="4rem">
        <Text>Chunk {id + 1}</Text>
        <Text>Done</Text>
      </HStack>
    );
  } else {
    return (
      <HStack justifyContent="center" spacing="8" h="4rem">
        <Text>Chunk {id + 1}</Text>
        <Box>
          <Text> {startToDate(chunk.start)} </Text>
        </Box>
        <Box>
          <Text>{timeInterval(chunk)}</Text>
        </Box>
      </HStack>
    );
  }
};