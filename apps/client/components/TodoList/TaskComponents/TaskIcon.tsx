import React from 'react';
import { Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type TaskIconProps = {
  icon: IconType;
};

export const TaskIcon: React.FC<TaskIconProps> = ({ icon }) => {
  return <Icon as={icon} fontSize={'2xl'} marginRight={'0.5rem'} />;
};
