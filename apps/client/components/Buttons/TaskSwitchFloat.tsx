import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex } from '@chakra-ui/react';

export const TaskSwitchFloat: React.FC = () => {
  return (
    <Flex justifyContent="center" mb={6}>
      <Box>
        <NextLink href="/add/const-task" passHref>
          <Button variant="outline" borderRightRadius={0}>
            CONST
          </Button>
        </NextLink>
        <Button borderLeftRadius={0}>FLOAT</Button>
      </Box>
    </Flex>
  );
};
