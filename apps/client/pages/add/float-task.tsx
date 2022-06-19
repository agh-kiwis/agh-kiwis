import React from 'react';
import {
  chillTimeInputFields,
  estimationInputFields,
  floatTaskInitialValues,
  maxChunkTimeInputFields,
  minChunkTimeInputFields,
  minTimeBetweenChunksInputFields,
} from './initialValues';
import { FloatTaskCreationForm } from '../../components/Tasks/FloatTaskForm';
import { addFloatTask } from '../../services/taskService';

const FloatTask: React.FC = () => {
  return (
    <FloatTaskCreationForm
      initialValues={floatTaskInitialValues}
      estimationInputFields={estimationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      minChunkTimeInputFields={minChunkTimeInputFields}
      maxChunkTimeInputFields={maxChunkTimeInputFields}
      minTimeBetweenChunksInputFields={minTimeBetweenChunksInputFields}
      onSubmit={addFloatTask}
    />
  );
};

export default FloatTask;
