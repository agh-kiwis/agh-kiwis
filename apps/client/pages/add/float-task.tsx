import React from 'react';
import {
  chillTimeInputFields,
  estimationInputFields,
  floatTaskInitialValues,
  maxChunkTimeInputFields,
  minChunkTimeInputFields,
  minTimeBetweenChunksInputFields,
} from './initialValues';
import { addFloatTask } from '../../components/Tasks/TaskService';
import { FloatTaskCreationForm } from '../../components/Tasks/FloatTaskForm';

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
