import React from 'react';
import { useRouter } from 'next/router';
import { ADD_CONST_TASK_URL } from '@agh-kiwis/workspace-constants';
import { CommonButton } from '../Buttons/CommonButtons';

export const AddTask: React.FC = () => {
  const router = useRouter();
  return (
    <CommonButton buttonText='Add Task' onClick={() => router.push(ADD_CONST_TASK_URL)} />
  );
};
