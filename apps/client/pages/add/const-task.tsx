import { useAddConstTaskMutation } from '@agh-kiwis/data-access';
import { ConstTaskType } from '@agh-kiwis/types';
import { ConstTaskForm, ErrorModal, Wrapper } from '@agh-kiwis/ui-components';
import { CONST_ERROR_INFO } from '@agh-kiwis/workspace-constants';
import { useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  chillTimeInputFields,
  constTaskInitialValues,
  durationInputFields,
  repeatEveryAmountFields,
  repeatEverySelectField
} from '../../formConfig/initialValues';
import { handleConstTaskSubmit } from '../../services/taskService';

const ConstTask: React.FC = () => {
  const [addConstTaskMutation] = useAddConstTaskMutation({
    update(cache) {
      cache.evict({ fieldName: 'tasks' });
      cache.evict({ fieldName: 'chunks' });
      cache.gc();
    },
  });
  const [addTaskError, setAddTaskError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleSubmit = async (values: ConstTaskType) => {
    await handleConstTaskSubmit(values, addConstTaskMutation).catch((error) => {
      onOpen();
      setAddTaskError(error.message);
    });
  };

  return (
    <Wrapper>
      {addTaskError && (
        <ErrorModal
          message={CONST_ERROR_INFO}
          isOpen={isOpen}
          onClose={onClose}
          cancelRef={cancelRef}
        />
      )}
      <ConstTaskForm
        initialValues={constTaskInitialValues}
        durationInputFields={durationInputFields}
        chillTimeInputFields={chillTimeInputFields}
        repeatEverySelectField={repeatEverySelectField}
        repeatEveryAmountFields={repeatEveryAmountFields}
        onSubmit={handleSubmit}
        isInEditMode={false}
      />
    </Wrapper>
  );
};

export default ConstTask;
