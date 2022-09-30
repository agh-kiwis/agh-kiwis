import React from 'react';
import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { TaskBreakdown } from '@agh-kiwis/data-access';
import { startToDate, timeInterval } from '@agh-kiwis/moment-service';

type BreakdownInfoProps = {
  checked: boolean;
  id: number;
  breakdown: TaskBreakdown;
};

export const BreakdownInfo: React.FC<BreakdownInfoProps> = ({
  id,
  breakdown,
  checked,
}) => {
  if (checked) {
    return (
      <Stack justifyContent="center">
        <Text>Chunk {id + 1}</Text>
        <Text>Done</Text>
      </Stack>
    );
  } else {
    return (
      <HStack justifyContent="center" spacing="8" h="4rem">
        <Text>Chunk {id + 1}</Text>
        <Box>
          <Text> {startToDate(breakdown.start)} </Text>
        </Box>
        <Box>
          <Text>{timeInterval(breakdown)}</Text>
        </Box>
      </HStack>
    );
  }
};
