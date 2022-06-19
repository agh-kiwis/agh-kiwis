import React from 'react';
import {
  chillTimeInputFields,
  durationInputFields,
  floatTaskInitialValues,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from './initialValues';
import { addFloatTask } from '../../components/Tasks/TaskService';
import { FloatTaskCreationForm } from '../../components/Tasks/FloatTaskForm';

const FloatTask: React.FC = () => {
  return (
    <FloatTaskCreationForm
      initialValues={floatTaskInitialValues}
      durationInputFields={durationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      repeatEverySelectField={repeatEverySelectField}
      repeatEveryAmountFields={repeatEveryAmountFields}
      onSubmit={addFloatTask}
    />
  );
};

export default FloatTask;
