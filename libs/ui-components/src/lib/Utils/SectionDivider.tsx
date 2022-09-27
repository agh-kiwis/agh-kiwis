import React from 'react';
import { Divider, Flex, Text } from '@chakra-ui/react';

export const SectionDivider: React.FC = () => {
  return (
    <Flex justify={'space-around'} align={'center'} my={6}>
      <Divider mx={4} />
      <Text fontSize="sm" color="insignificant">
        OR
      </Text>
      <Divider mx={4} />
    </Flex>
  );
};
