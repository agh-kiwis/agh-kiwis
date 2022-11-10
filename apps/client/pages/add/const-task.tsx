import React from 'react';
import { useRouter } from 'next/router';
import { useAddConstTaskMutation } from '@agh-kiwis/data-access';
import { ConstTaskType } from '@agh-kiwis/types';
import { ConstTaskForm } from '@agh-kiwis/ui-components';
import {
  chillTimeInputFields,
  constTaskInitialValues,
  durationInputFields,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from '../../formConfig/initialValues';
import { constTaskFormToAddTaskMutationMapper } from '../../services/taskService';

const ConstTask: React.FC = () => {
  const router = useRouter();
  const [addConstTaskMutation] = useAddConstTaskMutation();

  const handleSubmit = async (values: ConstTaskType) => {
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
    <ConstTaskForm
      initialValues={constTaskInitialValues}
      durationInputFields={durationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      repeatEverySelectField={repeatEverySelectField}
      repeatEveryAmountFields={repeatEveryAmountFields}
      onSubmit={handleSubmit}
      isInEditMode={false}
    />
  );
};

export default ConstTask;
