import React from 'react';
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
import { handleFloatTaskSubmit } from '../../services/taskService';

const FloatTask: React.FC = () => {
  const [addFloatTaskMutation] = useAddFloatTaskMutation();

  const handleSubmit = async (values: FloatTaskType) => {
    handleFloatTaskSubmit(values, addFloatTaskMutation);
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
