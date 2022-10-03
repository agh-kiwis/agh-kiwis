import React from 'react';
import { IconType } from 'react-icons/lib';
import { Icon } from '@chakra-ui/react';

type TaskIconProps = {
  icon: IconType;
};

export const TaskIcon: React.FC<TaskIconProps> = ({ icon }) => {
  return <Icon as={icon} fontSize="2xl" mr="0.5rem" />;
};
