import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex } from '@chakra-ui/react';

export const TaskSwitchConst: React.FC = () => {
  return (
    <Flex justifyContent="center" mb={6}>
      <Box>
        <Button borderRightRadius={0}>CONST</Button>
        <NextLink href="/add/float-task" passHref>
          <Button variant="outline" borderLeftRadius={0}>
            FLOAT
          </Button>
        </NextLink>
      </Box>
    </Flex>
  );
};
