import React from 'react';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import { useGetTaskQuery, useUpdateTaskMutation } from '@agh-kiwis/data-access';
import { constTaskType } from '@agh-kiwis/types';
import { AlertModal, ConstTaskForm } from '@agh-kiwis/ui-components';
import { UPDATE_TASK } from '@agh-kiwis/workspace-constants';
import {
  chillTimeInputFields,
  durationInputFields,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from '../../formConfig/initialValues';
import {
  constTaskToUpdateTaskMutationMapper,
  taskToConstTaskType,
} from '../../services/taskService';

const ConstTask: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [updateTaskMutation] = useUpdateTaskMutation();

  const { data, loading, error } = useGetTaskQuery({
    variables: {
      id: id[0],
    },
  });

  const handleSubmit = async (values: constTaskType) => {
    const taskResponse = await updateTaskMutation({
      variables: {
        taskInput: constTaskToUpdateTaskMutationMapper(parseInt(id[0]), values),
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

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    router.push('/');
    return (
      <AlertModal status={'error'} title={'Error!'} message={error.message} />
    );
  }
  return (
    <>
      {data.getTask.isFloat ? null : (
        <ConstTaskForm
          initialValues={taskToConstTaskType(data.getTask)}
          durationInputFields={durationInputFields}
          chillTimeInputFields={chillTimeInputFields}
          repeatEverySelectField={repeatEverySelectField}
          repeatEveryAmountFields={repeatEveryAmountFields}
          onSubmit={handleSubmit}
          submitButtonText={UPDATE_TASK}
        />
      )}
    </>
  );
};

export default ConstTask;
