import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** Interval string for Postgres, read more in docs */
  Interval: any;
};

export type AuthEmailLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthEmailRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  birthDate?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  color: Color;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type CategoryInput = {
  id?: InputMaybe<Scalars['Float']>;
  newCategory?: InputMaybe<CreateCategoryInput>;
};

export type ChunkInfo = {
  __typename?: 'ChunkInfo';
  id: Scalars['Float'];
  maxChunkDuration: Scalars['Interval'];
  minChunkDuration: Scalars['Interval'];
  minTimeBetweenChunks: Scalars['Interval'];
  start: Scalars['DateTime'];
};

export type ChunkInfoInput = {
  maxChunkDuration: Scalars['Interval'];
  minChunkDuration: Scalars['Interval'];
  minTimeBetweenChunks: Scalars['Interval'];
};

export type Color = {
  __typename?: 'Color';
  hexCode: Scalars['String'];
  id: Scalars['Float'];
};

export type CreateCategoryInput = {
  colorId: Scalars['Float'];
  name: Scalars['String'];
};

export type CreateConstTaskInput = {
  category: CategoryInput;
  chillTime: Scalars['Interval'];
  duration: Scalars['Interval'];
  name: Scalars['String'];
  priorityId?: InputMaybe<Scalars['Float']>;
  repeat: RepeatInput;
  shouldAutoResolve?: InputMaybe<Scalars['Boolean']>;
  start: Scalars['DateTime'];
  timeBeforeNotification?: InputMaybe<Scalars['Interval']>;
};

export type CreateFloatTaskInput = {
  category: CategoryInput;
  chillTime: Scalars['Interval'];
  chunkInfo: ChunkInfoInput;
  deadline: Scalars['DateTime'];
  estimation: Scalars['Interval'];
  name: Scalars['String'];
  priorityId?: InputMaybe<Scalars['Float']>;
  repeat: RepeatInput;
  shouldAutoResolve?: InputMaybe<Scalars['Boolean']>;
  start: Scalars['DateTime'];
  timeBeforeNotification?: InputMaybe<Scalars['Interval']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FilterOptions = {
  isDone?: InputMaybe<Scalars['Boolean']>;
  isFloat?: InputMaybe<Scalars['Boolean']>;
};

export type GetTasksInput = {
  filterOptions: FilterOptions;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addConstTask: Task;
  addFloatTask: Task;
  createCategory: Category;
  createUser: User;
  login: AuthResponse;
  logout: Scalars['Boolean'];
  register: AuthResponse;
  removeCategory: Category;
  removeTask: Task;
  removeUser: User;
  updateCategory: Category;
  updateTask: Task;
  updateUser: User;
};


export type MutationAddConstTaskArgs = {
  CreateConstTaskInput: CreateConstTaskInput;
};


export type MutationAddFloatTaskArgs = {
  createFloatTaskInput: CreateFloatTaskInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginDto: AuthEmailLoginInput;
};


export type MutationRegisterArgs = {
  registerDto: AuthEmailRegisterInput;
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveTaskArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  timeBefore: Scalars['Interval'];
};

export type Priority = {
  __typename?: 'Priority';
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findCategoryByPrefix: Array<Category>;
  findOne: Task;
  getTasks: Array<Task>;
  me: User;
  user: User;
  users: Array<User>;
};


export type QueryFindCategoryByPrefixArgs = {
  prefix: Scalars['String'];
};


export type QueryFindOneArgs = {
  id: Scalars['Int'];
};


export type QueryGetTasksArgs = {
  getTasksInput: GetTasksInput;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Repeat = {
  __typename?: 'Repeat';
  repeatEvery: Scalars['Float'];
  repeatType: Scalars['String'];
  startFrom: Scalars['DateTime'];
};

export type RepeatInput = {
  repeatEvery: Scalars['Float'];
  repeatType?: InputMaybe<RepeatType>;
  startFrom: Scalars['DateTime'];
};

/** Supported repeat types */
export enum RepeatType {
  Days = 'DAYS',
  Months = 'MONTHS',
  Weeks = 'WEEKS',
  Years = 'YEARS'
}

export type Task = {
  __typename?: 'Task';
  category: Category;
  chillTime: Scalars['Interval'];
  chunkInfo?: Maybe<ChunkInfo>;
  deadline?: Maybe<Scalars['String']>;
  estimation?: Maybe<Scalars['Interval']>;
  id: Scalars['Float'];
  isDone: Scalars['Boolean'];
  isFloat: Scalars['Boolean'];
  name: Scalars['String'];
  notifications?: Maybe<Notification>;
  priority: Priority;
  shouldAutoResolve: Scalars['Boolean'];
  taskBreakdowns?: Maybe<Array<TaskBreakdown>>;
};

export type TaskBreakdown = {
  __typename?: 'TaskBreakdown';
  duration: Scalars['Interval'];
  isDone: Scalars['Boolean'];
  repeat: Repeat;
  start: Scalars['DateTime'];
};

export type UpdateCategoryInput = {
  colorId?: InputMaybe<Scalars['Float']>;
  id: Scalars['Float'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateTaskInput = {
  category?: InputMaybe<CategoryInput>;
  chillTime?: InputMaybe<Scalars['Interval']>;
  duration?: InputMaybe<Scalars['Interval']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  priorityId?: InputMaybe<Scalars['Float']>;
  repeat?: InputMaybe<RepeatInput>;
  shouldAutoResolve?: InputMaybe<Scalars['Boolean']>;
  start?: InputMaybe<Scalars['DateTime']>;
  timeBeforeNotification?: InputMaybe<Scalars['Interval']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  birthDate?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
};

export type AddConstTaskMutationVariables = Exact<{
  CreateConstTaskInput: CreateConstTaskInput;
}>;


export type AddConstTaskMutation = { __typename?: 'Mutation', addConstTask: { __typename?: 'Task', chillTime: any, deadline?: string | null, estimation?: any | null, id: number, isDone: boolean, isFloat: boolean, name: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', id: number, maxChunkDuration: any, minChunkDuration: any, minTimeBetweenChunks: any, start: any } | null, notifications?: { __typename?: 'Notification', timeBefore: any } | null, priority: { __typename?: 'Priority', id: number, name: string }, taskBreakdowns?: Array<{ __typename?: 'TaskBreakdown', duration: any, isDone: boolean, start: any, repeat: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, startFrom: any } }> | null } };

export type AddFloatTaskMutationVariables = Exact<{
  createFloatTaskInput: CreateFloatTaskInput;
}>;


export type AddFloatTaskMutation = { __typename?: 'Mutation', addFloatTask: { __typename?: 'Task', chillTime: any, deadline?: string | null, estimation?: any | null, id: number, isDone: boolean, isFloat: boolean, name: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', id: number, maxChunkDuration: any, minChunkDuration: any, minTimeBetweenChunks: any, start: any } | null, notifications?: { __typename?: 'Notification', timeBefore: any } | null, priority: { __typename?: 'Priority', id: number, name: string }, taskBreakdowns?: Array<{ __typename?: 'TaskBreakdown', duration: any, isDone: boolean, start: any, repeat: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, startFrom: any } }> | null } };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, name?: string | null } };

export type LoginMutationVariables = Exact<{
  loginDto: AuthEmailLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', birthDate?: any | null, email: string, gender?: string | null, id: number, name?: string | null, token?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerDto: AuthEmailRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', birthDate?: any | null, email: string, gender?: string | null, id: number, name?: string | null, token?: string | null } };

export type RemoveCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeCategory: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } } };

export type RemoveTaskMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveTaskMutation = { __typename?: 'Mutation', removeTask: { __typename?: 'Task', chillTime: any, deadline?: string | null, estimation?: any | null, id: number, isDone: boolean, isFloat: boolean, name: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', id: number, maxChunkDuration: any, minChunkDuration: any, minTimeBetweenChunks: any, start: any } | null, notifications?: { __typename?: 'Notification', timeBefore: any } | null, priority: { __typename?: 'Priority', id: number, name: string }, taskBreakdowns?: Array<{ __typename?: 'TaskBreakdown', duration: any, isDone: boolean, start: any, repeat: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, startFrom: any } }> | null } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, name?: string | null } };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } } };

export type UpdateTaskMutationVariables = Exact<{
  updateTaskInput: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', chillTime: any, deadline?: string | null, estimation?: any | null, id: number, isDone: boolean, isFloat: boolean, name: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', id: number, maxChunkDuration: any, minChunkDuration: any, minTimeBetweenChunks: any, start: any } | null, notifications?: { __typename?: 'Notification', timeBefore: any } | null, priority: { __typename?: 'Priority', id: number, name: string }, taskBreakdowns?: Array<{ __typename?: 'TaskBreakdown', duration: any, isDone: boolean, start: any, repeat: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, startFrom: any } }> | null } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, name?: string | null } };

export type FindCategoryByPrefixQueryVariables = Exact<{
  prefix: Scalars['String'];
}>;


export type FindCategoryByPrefixQuery = { __typename?: 'Query', findCategoryByPrefix: Array<{ __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }> };

export type FindOneQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindOneQuery = { __typename?: 'Query', findOne: { __typename?: 'Task', chillTime: any, deadline?: string | null, estimation?: any | null, id: number, isDone: boolean, isFloat: boolean, name: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', id: number, maxChunkDuration: any, minChunkDuration: any, minTimeBetweenChunks: any, start: any } | null, notifications?: { __typename?: 'Notification', timeBefore: any } | null, priority: { __typename?: 'Priority', id: number, name: string }, taskBreakdowns?: Array<{ __typename?: 'TaskBreakdown', duration: any, isDone: boolean, start: any, repeat: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, startFrom: any } }> | null } };

export type GetTasksQueryVariables = Exact<{
  getTasksInput: GetTasksInput;
}>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'Task', chillTime: any, deadline?: string | null, estimation?: any | null, id: number, isDone: boolean, isFloat: boolean, name: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', id: number, maxChunkDuration: any, minChunkDuration: any, minTimeBetweenChunks: any, start: any } | null, notifications?: { __typename?: 'Notification', timeBefore: any } | null, priority: { __typename?: 'Priority', id: number, name: string }, taskBreakdowns?: Array<{ __typename?: 'TaskBreakdown', duration: any, isDone: boolean, start: any, repeat: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, startFrom: any } }> | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, name?: string | null } };

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, name?: string | null } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, name?: string | null }> };


export const AddConstTaskDocument = gql`
    mutation addConstTask($CreateConstTaskInput: CreateConstTaskInput!) {
  addConstTask(CreateConstTaskInput: $CreateConstTaskInput) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chillTime
    chunkInfo {
      id
      maxChunkDuration
      minChunkDuration
      minTimeBetweenChunks
      start
    }
    deadline
    estimation
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority {
      id
      name
    }
    shouldAutoResolve
    taskBreakdowns {
      duration
      isDone
      repeat {
        repeatEvery
        repeatType
        startFrom
      }
      start
    }
  }
}
    `;
export type AddConstTaskMutationFn = Apollo.MutationFunction<AddConstTaskMutation, AddConstTaskMutationVariables>;

/**
 * __useAddConstTaskMutation__
 *
 * To run a mutation, you first call `useAddConstTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddConstTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addConstTaskMutation, { data, loading, error }] = useAddConstTaskMutation({
 *   variables: {
 *      CreateConstTaskInput: // value for 'CreateConstTaskInput'
 *   },
 * });
 */
export function useAddConstTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddConstTaskMutation, AddConstTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddConstTaskMutation, AddConstTaskMutationVariables>(AddConstTaskDocument, options);
}
export type AddConstTaskMutationHookResult = ReturnType<typeof useAddConstTaskMutation>;
export type AddConstTaskMutationResult = Apollo.MutationResult<AddConstTaskMutation>;
export type AddConstTaskMutationOptions = Apollo.BaseMutationOptions<AddConstTaskMutation, AddConstTaskMutationVariables>;
export const AddFloatTaskDocument = gql`
    mutation addFloatTask($createFloatTaskInput: CreateFloatTaskInput!) {
  addFloatTask(createFloatTaskInput: $createFloatTaskInput) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chillTime
    chunkInfo {
      id
      maxChunkDuration
      minChunkDuration
      minTimeBetweenChunks
      start
    }
    deadline
    estimation
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority {
      id
      name
    }
    shouldAutoResolve
    taskBreakdowns {
      duration
      isDone
      repeat {
        repeatEvery
        repeatType
        startFrom
      }
      start
    }
  }
}
    `;
export type AddFloatTaskMutationFn = Apollo.MutationFunction<AddFloatTaskMutation, AddFloatTaskMutationVariables>;

/**
 * __useAddFloatTaskMutation__
 *
 * To run a mutation, you first call `useAddFloatTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFloatTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFloatTaskMutation, { data, loading, error }] = useAddFloatTaskMutation({
 *   variables: {
 *      createFloatTaskInput: // value for 'createFloatTaskInput'
 *   },
 * });
 */
export function useAddFloatTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddFloatTaskMutation, AddFloatTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddFloatTaskMutation, AddFloatTaskMutationVariables>(AddFloatTaskDocument, options);
}
export type AddFloatTaskMutationHookResult = ReturnType<typeof useAddFloatTaskMutation>;
export type AddFloatTaskMutationResult = Apollo.MutationResult<AddFloatTaskMutation>;
export type AddFloatTaskMutationOptions = Apollo.BaseMutationOptions<AddFloatTaskMutation, AddFloatTaskMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($createCategoryInput: CreateCategoryInput!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    color {
      hexCode
      id
    }
    id
    name
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      createCategoryInput: // value for 'createCategoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
}
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    birthDate
    email
    gender
    id
    name
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation login($loginDto: AuthEmailLoginInput!) {
  login(loginDto: $loginDto) {
    birthDate
    email
    gender
    id
    name
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginDto: // value for 'loginDto'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation register($registerDto: AuthEmailRegisterInput!) {
  register(registerDto: $registerDto) {
    birthDate
    email
    gender
    id
    name
    token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerDto: // value for 'registerDto'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveCategoryDocument = gql`
    mutation removeCategory($id: Int!) {
  removeCategory(id: $id) {
    color {
      hexCode
      id
    }
    id
    name
  }
}
    `;
export type RemoveCategoryMutationFn = Apollo.MutationFunction<RemoveCategoryMutation, RemoveCategoryMutationVariables>;

/**
 * __useRemoveCategoryMutation__
 *
 * To run a mutation, you first call `useRemoveCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCategoryMutation, { data, loading, error }] = useRemoveCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCategoryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RemoveCategoryMutation, RemoveCategoryMutationVariables>(RemoveCategoryDocument, options);
}
export type RemoveCategoryMutationHookResult = ReturnType<typeof useRemoveCategoryMutation>;
export type RemoveCategoryMutationResult = Apollo.MutationResult<RemoveCategoryMutation>;
export type RemoveCategoryMutationOptions = Apollo.BaseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const RemoveTaskDocument = gql`
    mutation removeTask($id: Int!) {
  removeTask(id: $id) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chillTime
    chunkInfo {
      id
      maxChunkDuration
      minChunkDuration
      minTimeBetweenChunks
      start
    }
    deadline
    estimation
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority {
      id
      name
    }
    shouldAutoResolve
    taskBreakdowns {
      duration
      isDone
      repeat {
        repeatEvery
        repeatType
        startFrom
      }
      start
    }
  }
}
    `;
export type RemoveTaskMutationFn = Apollo.MutationFunction<RemoveTaskMutation, RemoveTaskMutationVariables>;

/**
 * __useRemoveTaskMutation__
 *
 * To run a mutation, you first call `useRemoveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTaskMutation, { data, loading, error }] = useRemoveTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTaskMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTaskMutation, RemoveTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RemoveTaskMutation, RemoveTaskMutationVariables>(RemoveTaskDocument, options);
}
export type RemoveTaskMutationHookResult = ReturnType<typeof useRemoveTaskMutation>;
export type RemoveTaskMutationResult = Apollo.MutationResult<RemoveTaskMutation>;
export type RemoveTaskMutationOptions = Apollo.BaseMutationOptions<RemoveTaskMutation, RemoveTaskMutationVariables>;
export const RemoveUserDocument = gql`
    mutation removeUser($id: Int!) {
  removeUser(id: $id) {
    birthDate
    email
    gender
    id
    name
  }
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
}
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {
  updateCategory(updateCategoryInput: $updateCategoryInput) {
    color {
      hexCode
      id
    }
    id
    name
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      updateCategoryInput: // value for 'updateCategoryInput'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($updateTaskInput: UpdateTaskInput!) {
  updateTask(updateTaskInput: $updateTaskInput) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chillTime
    chunkInfo {
      id
      maxChunkDuration
      minChunkDuration
      minTimeBetweenChunks
      start
    }
    deadline
    estimation
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority {
      id
      name
    }
    shouldAutoResolve
    taskBreakdowns {
      duration
      isDone
      repeat {
        repeatEvery
        repeatType
        startFrom
      }
      start
    }
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      updateTaskInput: // value for 'updateTaskInput'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
}
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    birthDate
    email
    gender
    id
    name
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const FindCategoryByPrefixDocument = gql`
    query findCategoryByPrefix($prefix: String!) {
  findCategoryByPrefix(prefix: $prefix) {
    color {
      hexCode
      id
    }
    id
    name
  }
}
    `;

/**
 * __useFindCategoryByPrefixQuery__
 *
 * To run a query within a React component, call `useFindCategoryByPrefixQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCategoryByPrefixQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCategoryByPrefixQuery({
 *   variables: {
 *      prefix: // value for 'prefix'
 *   },
 * });
 */
export function useFindCategoryByPrefixQuery(baseOptions: Apollo.QueryHookOptions<FindCategoryByPrefixQuery, FindCategoryByPrefixQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FindCategoryByPrefixQuery, FindCategoryByPrefixQueryVariables>(FindCategoryByPrefixDocument, options);
}
export function useFindCategoryByPrefixLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCategoryByPrefixQuery, FindCategoryByPrefixQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FindCategoryByPrefixQuery, FindCategoryByPrefixQueryVariables>(FindCategoryByPrefixDocument, options);
}
export type FindCategoryByPrefixQueryHookResult = ReturnType<typeof useFindCategoryByPrefixQuery>;
export type FindCategoryByPrefixLazyQueryHookResult = ReturnType<typeof useFindCategoryByPrefixLazyQuery>;
export type FindCategoryByPrefixQueryResult = Apollo.QueryResult<FindCategoryByPrefixQuery, FindCategoryByPrefixQueryVariables>;
export const FindOneDocument = gql`
    query findOne($id: Int!) {
  findOne(id: $id) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chillTime
    chunkInfo {
      id
      maxChunkDuration
      minChunkDuration
      minTimeBetweenChunks
      start
    }
    deadline
    estimation
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority {
      id
      name
    }
    shouldAutoResolve
    taskBreakdowns {
      duration
      isDone
      repeat {
        repeatEvery
        repeatType
        startFrom
      }
      start
    }
  }
}
    `;

/**
 * __useFindOneQuery__
 *
 * To run a query within a React component, call `useFindOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneQuery(baseOptions: Apollo.QueryHookOptions<FindOneQuery, FindOneQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FindOneQuery, FindOneQueryVariables>(FindOneDocument, options);
}
export function useFindOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneQuery, FindOneQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FindOneQuery, FindOneQueryVariables>(FindOneDocument, options);
}
export type FindOneQueryHookResult = ReturnType<typeof useFindOneQuery>;
export type FindOneLazyQueryHookResult = ReturnType<typeof useFindOneLazyQuery>;
export type FindOneQueryResult = Apollo.QueryResult<FindOneQuery, FindOneQueryVariables>;
export const GetTasksDocument = gql`
    query getTasks($getTasksInput: GetTasksInput!) {
  getTasks(getTasksInput: $getTasksInput) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chillTime
    chunkInfo {
      id
      maxChunkDuration
      minChunkDuration
      minTimeBetweenChunks
      start
    }
    deadline
    estimation
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority {
      id
      name
    }
    shouldAutoResolve
    taskBreakdowns {
      duration
      isDone
      repeat {
        repeatEvery
        repeatType
        startFrom
      }
      start
    }
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      getTasksInput: // value for 'getTasksInput'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
}
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
}
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    birthDate
    email
    gender
    id
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query user($id: Int!) {
  user(id: $id) {
    birthDate
    email
    gender
    id
    name
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query users {
  users {
    birthDate
    email
    gender
    id
    name
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
export default result;
