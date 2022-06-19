import React from 'react';
import { useAddConstTaskMutation } from '@agh-kiwis/data-access';
import {
  chillTimeInputFields,
  durationInputFields,
  constTaskInitialValues,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from './initialValues';
import { constTaskType } from '../../types/TaskTypes';
import { ConstTaskCreationForm } from '../../components/Tasks/ConstTaskForm';
import { constTaskFormToAddTaskMutationMapper } from '../../services/taskService';

const ConstTask: React.FC = () => {
  const [addConstTaskMutation] = useAddConstTaskMutation();

  const handleSubmit = async (values: constTaskType) => {
    const taskResponse = await addConstTaskMutation({
      variables: {
        createConstTaskInput: constTaskFormToAddTaskMutationMapper(values),
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
    <ConstTaskCreationForm
      initialValues={constTaskInitialValues}
      durationInputFields={durationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      repeatEverySelectField={repeatEverySelectField}
      repeatEveryAmountFields={repeatEveryAmountFields}
      onSubmit={handleSubmit}
    />
  );
};

export default ConstTask;
