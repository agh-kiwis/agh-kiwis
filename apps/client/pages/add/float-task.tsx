import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useAddFloatTaskMutation } from '@agh-kiwis/data-access';
import { FloatTaskType } from '@agh-kiwis/types';
import { ErrorModal, FloatTaskForm, Wrapper } from '@agh-kiwis/ui-components';
import { FLOAT_ERROR_INFO } from '@agh-kiwis/workspace-constants';
import {
  chillTimeInputFields,
  estimationInputFields,
  floatTaskInitialValues,
  maxChunkTimeInputFields,
  minChunkTimeInputFields,
} from '../../formConfig/initialValues';
import { handleFloatTaskSubmit } from '../../services/taskService';

const FloatTask: React.FC = () => {
  const [addFloatTaskMutation] = useAddFloatTaskMutation();
  const [addTaskError, setAddTaskError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleSubmit = async (values: FloatTaskType) => {
    await handleFloatTaskSubmit(values, addFloatTaskMutation).catch((error) => {
      onOpen();
      setAddTaskError(error.message);
    });
  };

  return (
    <Wrapper>
      {addTaskError && (
        <ErrorModal
          message={FLOAT_ERROR_INFO}
          isOpen={isOpen}
          onClose={onClose}
          cancelRef={cancelRef}
        />
      )}
      <FloatTaskForm
        initialValues={floatTaskInitialValues}
        estimationInputFields={estimationInputFields}
        chillTimeInputFields={chillTimeInputFields}
        minChunkTimeInputFields={minChunkTimeInputFields}
        maxChunkTimeInputFields={maxChunkTimeInputFields}
        onSubmit={handleSubmit}
        isInEditMode={false}
      />
    </Wrapper>
  );
};

export default FloatTask;
