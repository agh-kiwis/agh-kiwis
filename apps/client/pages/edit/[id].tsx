import React from 'react';
import { useRouter } from 'next/router';
import {
  useGetTaskQuery,
  useUpdateConstTaskMutation,
  useUpdateFloatTaskMutation,
} from '@agh-kiwis/data-access';
import { ConstTaskType, FloatTaskType } from '@agh-kiwis/types';
import {
  AlertModal,
  ConstTaskForm,
  CustomSpinner,
  FloatTaskForm,
} from '@agh-kiwis/ui-components';
import {
  chillTimeInputFields,
  durationInputFields,
  estimationInputFields,
  maxChunkTimeInputFields,
  minChunkTimeInputFields,
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
  const [updateConstTaskMutation] = useUpdateConstTaskMutation({
    update(cache) {
      cache.evict({ fieldName: 'tasks' });
      cache.evict({ fieldName: 'chunks' });
      cache.gc();
    },
  });
  const [updateFloatTaskMutation] = useUpdateFloatTaskMutation();

  const { data, loading, error } = useGetTaskQuery({
    variables: {
      id: Array.isArray(id) ? id[0] : id,
    },
  });

  const handleConstSubmit = async (values: ConstTaskType) => {
    const taskResponse = await updateConstTaskMutation({
      variables: {
        id: parseInt(Array.isArray(id) ? id[0] : id),
        taskInput: constTaskToUpdateTaskMutationMapper(values),
      },
    }).catch((error) => {
      console.log(error);
    });

    if (taskResponse) {
      router.push('/');
    }
  };

  const handleFloatSubmit = async (values: FloatTaskType) => {
    const taskResponse = await updateFloatTaskMutation({
      variables: {
        id: parseInt(Array.isArray(id) ? id[0] : id),
        taskInput: floatTaskToUpdateTaskMutationMapper(values),
      },
    }).catch((error) => {
      console.log(error);
    });

    if (taskResponse) {
      router.push('/');
    }
  };

  if (loading) {
    return <CustomSpinner />;
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
