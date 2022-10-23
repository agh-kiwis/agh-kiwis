import React from 'react';
import { useRouter } from 'next/router';
import { useAddFloatTaskMutation } from '@agh-kiwis/data-access';
import { floatTaskType } from '@agh-kiwis/types';
import { FloatTaskForm } from '@agh-kiwis/ui-components';
import { ADD_NEW_TASK, ADD_TASK } from '@agh-kiwis/workspace-constants';
import {
  chillTimeInputFields,
  estimationInputFields,
  floatTaskInitialValues,
  maxChunkTimeInputFields,
  minChunkTimeInputFields,
  minTimeBetweenChunksInputFields,
} from '../../formConfig/initialValues';
import { floatTaskFormToAddTaskMutationMapper } from '../../services/taskService';

const FloatTask: React.FC = () => {
  const router = useRouter();
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
      router.push('/');
    }
  };

  return (
    <FloatTaskForm
      initialValues={floatTaskInitialValues}
      estimationInputFields={estimationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      minChunkTimeInputFields={minChunkTimeInputFields}
      maxChunkTimeInputFields={maxChunkTimeInputFields}
      minTimeBetweenChunksInputFields={minTimeBetweenChunksInputFields}
      onSubmit={handleSubmit}
      submitButtonText={ADD_TASK}
      headerText={ADD_NEW_TASK}
    />
  );
};

export default FloatTask;
