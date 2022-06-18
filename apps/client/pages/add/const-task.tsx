import React from 'react';
import {
  chillTimeInputFields,
  durationInputFields,
  initialValues,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from './initialValues';
import { ConstTaskCreationForm } from 'apps/client/components/Tasks/ConstTaskForm';
import { addConstTask } from 'apps/client/components/Tasks/TaskService';

const ConstTask: React.FC = () => {
  return (
    <ConstTaskCreationForm
      initialValues={initialValues}
      durationInputFields={durationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      repeatEverySelectField={repeatEverySelectField}
      repeatEveryAmountFields={repeatEveryAmountFields}
      onSubmit={addConstTask}
    />
  );
};

export default ConstTask;
