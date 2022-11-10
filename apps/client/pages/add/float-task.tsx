import React from 'react';
import { useRouter } from 'next/router';
import { useAddFloatTaskMutation } from '@agh-kiwis/data-access';
import { FloatTaskType } from '@agh-kiwis/types';
import { FloatTaskForm } from '@agh-kiwis/ui-components';
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

  const handleSubmit = async (values: FloatTaskType) => {
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
      isInEditMode={false}
    />
  );
};

export default FloatTask;
