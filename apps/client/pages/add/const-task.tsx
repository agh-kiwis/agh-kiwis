import React from 'react';
import { useRouter } from 'next/router';
import { useAddConstTaskMutation } from '@agh-kiwis/data-access';
import {
  chillTimeInputFields,
  durationInputFields,
  constTaskInitialValues,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from '../../formConfig/initialValues';
import { constTaskFormToAddTaskMutationMapper } from '../../services/taskService';
import { constTaskType } from '@agh-kiwis/types';
import { ConstTaskCreationForm } from '@agh-kiwis/ui-components';

const ConstTask: React.FC = () => {
  const router = useRouter();
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
      router.push('/');
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
