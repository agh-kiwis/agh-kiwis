import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  ADD_NEW_TASK,
  UPDATE_EXISTING_TASK,
} from '@agh-kiwis/workspace-constants';
import { TaskSwitchConst, TaskSwitchFloat } from '../Buttons/TaskSwitchButtons';
import { Header } from '../Common/Header';

type ModeHeaderProps = {
  isFloat: boolean;
  isInEditMode: boolean;
};

export const ModeHeader: React.FC<ModeHeaderProps> = ({
  isFloat,
  isInEditMode,
}) => {
  return (
    <>
      <Box mb={4}>
        <Header
          text={isInEditMode ? UPDATE_EXISTING_TASK : ADD_NEW_TASK}
          size="xl"
        />
      </Box>
      {isFloat ? (
        <TaskSwitchFloat isDisabled={isInEditMode} />
      ) : (
        <TaskSwitchConst isDisabled={isInEditMode} />
      )}
    </>
  );
};
