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
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Category = {
  __typename?: 'Category';
  color: Color;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type ChunkInfo = {
  __typename?: 'ChunkInfo';
  id: Scalars['Float'];
  maxChunkDuration: Scalars['Interval'];
  minChunkDuration: Scalars['Interval'];
  minTimeBetweenChunks: Scalars['Interval'];
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
  categoryId: Scalars['Float'];
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
  categoryId: Scalars['Float'];
  chillTime: Scalars['Interval'];
  chunkInfo: ChunkInfoInput;
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
  colorId: Scalars['Float'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type UpdateTaskInput = {
  categoryId?: InputMaybe<Scalars['Float']>;
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
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AddConstTaskMutationVariables = Exact<{
  createConstTaskInput: CreateConstTaskInput;
}>;


export type AddConstTaskMutation = { __typename?: 'Mutation', addConstTask: { __typename?: 'Task', chillTime: any, deadline?: string | null, estimation?: any | null, id: number, isDone: boolean, isFloat: boolean, name: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', id: number, maxChunkDuration: any, minChunkDuration: any, minTimeBetweenChunks: any } | null, notifications?: { __typename?: 'Notification', timeBefore: any } | null, priority: { __typename?: 'Priority', id: number, name: string }, taskBreakdowns?: Array<{ __typename?: 'TaskBreakdown', duration: any, isDone: boolean, start: any, repeat: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, startFrom: any } }> | null } };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } } };

export type LoginMutationVariables = Exact<{
  loginDto: AuthEmailLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', birthDate?: any | null, createdAt: any, deletedAt?: any | null, email: string, gender?: string | null, id: number, name?: string | null, updatedAt?: any | null, token?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerDto: AuthEmailRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', birthDate?: any | null, createdAt: any, deletedAt?: any | null, email: string, gender?: string | null, id: number, name?: string | null, updatedAt?: any | null, token?: string | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', birthDate?: any | null, createdAt: any, deletedAt?: any | null, email: string, gender?: string | null, id: number, name?: string | null, updatedAt?: any | null } };


export const AddConstTaskDocument = gql`
    mutation AddConstTask($createConstTaskInput: CreateConstTaskInput!) {
  addConstTask(CreateConstTaskInput: $createConstTaskInput) {
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
 *      createConstTaskInput: // value for 'createConstTaskInput'
 *   },
 * });
 */
export function useAddConstTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddConstTaskMutation, AddConstTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddConstTaskMutation, AddConstTaskMutationVariables>(AddConstTaskDocument, options);
      }
export type AddConstTaskMutationHookResult = ReturnType<typeof useAddConstTaskMutation>;
export type AddConstTaskMutationResult = Apollo.MutationResult<AddConstTaskMutation>;
export type AddConstTaskMutationOptions = Apollo.BaseMutationOptions<AddConstTaskMutation, AddConstTaskMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginDto: AuthEmailLoginInput!) {
  login(loginDto: $loginDto) {
    birthDate
    createdAt
    deletedAt
    email
    gender
    id
    name
    updatedAt
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerDto: AuthEmailRegisterInput!) {
  register(registerDto: $registerDto) {
    birthDate
    createdAt
    deletedAt
    email
    gender
    id
    name
    updatedAt
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    birthDate
    createdAt
    deletedAt
    email
    gender
    id
    name
    updatedAt
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    