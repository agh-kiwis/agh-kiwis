import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex } from '@chakra-ui/react';
import {
  ADD_CONST_TASK_URL,
  ADD_FLOAT_TASK_URL,
} from '@agh-kiwis/workspace-constants';

type TaskSwitchProps = {
  isDisabled: boolean;
};

export const TaskSwitchConst: React.FC<TaskSwitchProps> = ({ isDisabled }) => {
  return (
    <Flex justifyContent="center" mb={6}>
      <Box>
        <Button borderRightRadius={0} isDisabled={isDisabled}>
          CONST
        </Button>
        <NextLink href={ADD_FLOAT_TASK_URL} passHref>
          <Button
            variant="outline"
            borderLeftRadius={0}
            isDisabled={isDisabled}
          >
            FLOAT
          </Button>
        </NextLink>
      </Box>
    </Flex>
  );
};

export const TaskSwitchFloat: React.FC<TaskSwitchProps> = ({ isDisabled }) => {
  return (
    <Flex justifyContent="center" mb={6}>
      <Box>
        <NextLink href={ADD_CONST_TASK_URL} passHref>
          <Button
            variant="outline"
            borderRightRadius={0}
            isDisabled={isDisabled}
          >
            CONST
          </Button>
        </NextLink>
        <Button borderLeftRadius={0} isDisabled={isDisabled}>
          FLOAT
        </Button>
      </Box>
    </Flex>
  );
};
