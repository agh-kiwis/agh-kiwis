import React from 'react';
import { useAddFloatTaskMutation } from '@agh-kiwis/data-access';
import {
  chillTimeInputFields,
  estimationInputFields,
  floatTaskInitialValues,
  maxChunkTimeInputFields,
  minChunkTimeInputFields,
  minTimeBetweenChunksInputFields,
} from './initialValues';
import { FloatTaskCreationForm } from '../../components/Tasks/FloatTaskForm';
import { floatTaskFormToAddTaskMutationMapper } from '../../services/taskService';
import { floatTaskType } from '../../types/TaskTypes';

const FloatTask: React.FC = () => {
  const [addFloatTaskMutation] = useAddFloatTaskMutation();

  const handleSubmit = async (values: floatTaskType) => {
    const taskResponse = await addFloatTaskMutation({
      variables: {
        createFloatTaskInput: floatTaskFormToAddTaskMutationMapper(values),
      },
    }).catch((error) => {
      // TODO handle error
      console.log(error);
    });

    if (taskResponse) {
      // TODO handle success
      console.log(taskResponse.data);
    }
  };

  return (
    <FloatTaskCreationForm
      initialValues={floatTaskInitialValues}
      estimationInputFields={estimationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      minChunkTimeInputFields={minChunkTimeInputFields}
      maxChunkTimeInputFields={maxChunkTimeInputFields}
      minTimeBetweenChunksInputFields={minTimeBetweenChunksInputFields}
      onSubmit={handleSubmit}
    />
  );
};

export default FloatTask;
