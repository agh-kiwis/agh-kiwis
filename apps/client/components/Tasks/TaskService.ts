import { useAddConstTaskMutation } from '@agh-kiwis/data-access';

export const addConstTask = async (values) => {
  console.log(values);

  // const [addConstTaskMutation, { data, loading, error }] =
  //   useAddConstTaskMutation({
  //     variables: { createConstTaskInput: { categoryId: '',  } },
  //   });
};

export const addFloatTask = async (values) => {
  console.log(values);
};
