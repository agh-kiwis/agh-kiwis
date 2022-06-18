import React from 'react';
import {
  chillTimeInputFields,
  durationInputFields,
  constTaskInitialValues,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from './initialValues';
import { ConstTaskCreationForm } from '../../components/Tasks/ConstTaskForm';
import { addConstTask } from '../../components/Tasks/TaskService';

const ConstTask: React.FC = () => {
  return (
    <ConstTaskCreationForm
      initialValues={constTaskInitialValues}
      durationInputFields={durationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      repeatEverySelectField={repeatEverySelectField}
      repeatEveryAmountFields={repeatEveryAmountFields}
      onSubmit={addConstTask}
    />
  );
};

export default ConstTask;
