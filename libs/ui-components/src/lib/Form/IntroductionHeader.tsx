import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Logo } from '../Utils/Logo';

type IntroductionHeaderProps = {
  message: string | undefined;
};

export const IntroductionHeader: React.FC<IntroductionHeaderProps> = ({
  message,
}) => {
  return (
    <>
      <Logo textVisible={false} />
      <Flex w="100%" justifyContent="center" mb="4">
        <Text fontSize="4xl" textAlign="center">
          {message}
        </Text>
      </Flex>
    </>
  );
};
