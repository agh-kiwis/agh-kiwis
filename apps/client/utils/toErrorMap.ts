/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloError } from '@apollo/client';

// TODO define custom ApolloError type, to not use any in that way
export const toErrorMap = (error: ApolloError & any) => {
  const errors = error?.graphQLErrors[0]?.extensions?.exception;
  const errorMap: Record<string, string> = {};

  // Iterate over keys
  for (const key in errors) {
    if (errors[key].length > 1) {
      // TODO There we need to think what we would like to do, when we have more than one error
      // In field
      errorMap[key] = errors[key].join(' ');
    } else {
      errorMap[key] = errors[key];
    }
  }
  return errorMap;
};
