import React from 'react';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import {
  useGetTaskQuery,
  useUpdateConstTaskMutation,
  useUpdateFloatTaskMutation,
} from '@agh-kiwis/data-access';
import { constTaskType, floatTaskType } from '@agh-kiwis/types';
import {
  AlertModal,
  ConstTaskForm,
  FloatTaskForm,
} from '@agh-kiwis/ui-components';
import {
  chillTimeInputFields,
  durationInputFields,
  estimationInputFields,
  maxChunkTimeInputFields,
  minChunkTimeInputFields,
  minTimeBetweenChunksInputFields,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from '../../formConfig/initialValues';
import {
  constTaskToUpdateTaskMutationMapper,
  floatTaskToUpdateTaskMutationMapper,
  taskToConstTaskType,
  taskToFloatTaskType,
} from '../../services/taskService';

const ConstTask: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [updateConstTaskMutation] = useUpdateConstTaskMutation();
  const [updateFloatTaskMutation] = useUpdateFloatTaskMutation();

  const { data, loading, error } = useGetTaskQuery({
    variables: {
      id: id ? id[0] : null,
    },
  });

  const handleConstSubmit = async (values: constTaskType) => {
    const taskResponse = await updateConstTaskMutation({
      variables: {
        taskInput: constTaskToUpdateTaskMutationMapper(parseInt(id[0]), values),
      },
    }).catch((error) => {
      console.log(error);
    });

    if (taskResponse) {
      router.push('/');
    }
  };

  const handleFloatSubmit = async (values: floatTaskType) => {
    const taskResponse = await updateFloatTaskMutation({
      variables: {
        taskInput: floatTaskToUpdateTaskMutationMapper(parseInt(id[0]), values),
      },
    }).catch((error) => {
      console.log(error);
    });

    if (taskResponse) {
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
      {data.getTask.isFloat ? (
        <FloatTaskForm
          initialValues={taskToFloatTaskType(data.getTask)}
          estimationInputFields={estimationInputFields}
          chillTimeInputFields={chillTimeInputFields}
          minChunkTimeInputFields={minChunkTimeInputFields}
          maxChunkTimeInputFields={maxChunkTimeInputFields}
          minTimeBetweenChunksInputFields={minTimeBetweenChunksInputFields}
          onSubmit={handleFloatSubmit}
          isInEditMode={true}
        />
      ) : (
        <ConstTaskForm
          initialValues={taskToConstTaskType(data.getTask)}
          durationInputFields={durationInputFields}
          chillTimeInputFields={chillTimeInputFields}
          repeatEverySelectField={repeatEverySelectField}
          repeatEveryAmountFields={repeatEveryAmountFields}
          onSubmit={handleConstSubmit}
          isInEditMode={true}
        />
      )}
    </>
  );
};

export default ConstTask;
