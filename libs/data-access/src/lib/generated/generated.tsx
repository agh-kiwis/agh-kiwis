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
  DateTime: any;
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

export type AuthGoogleLoginInput = {
  credential: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  birthDate?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  introductionCompleted: Scalars['Boolean'];
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

export type Chunk = {
  __typename?: 'Chunk';
  duration: Scalars['Interval'];
  id: Scalars['Int'];
  isDone: Scalars['Boolean'];
  start: Scalars['DateTime'];
  task?: Maybe<Task>;
};

export type ChunkFilterOptions = {
  chunkEndBefore?: InputMaybe<Scalars['DateTime']>;
  chunkStartAfter?: InputMaybe<Scalars['DateTime']>;
  taskIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type ChunkInfo = {
  __typename?: 'ChunkInfo';
  /** A minimum time gap that user wants to have between this task and another tasks. */
  chillTime: Scalars['Interval'];
  /** Only float tasks. This field is mandatory for float tasks. Point in time when the whole task needs to be done. */
  deadline?: Maybe<Scalars['String']>;
  /** Only const tasks. Duration of the task. Is the same with chunk.duration. Is stored here also for easier access. */
  duration?: Maybe<Scalars['Interval']>;
  /** Only float tasks. Estimation on how much time this task would take. This can change in time and according to that value planning algorithm (in case of float tasks) will replan the task. */
  estimation?: Maybe<Scalars['Interval']>;
  id: Scalars['Float'];
  /** Only float tasks. Represents a maximum duration of the chunk this task needs to be divided into. */
  maxChunkDuration?: Maybe<Scalars['Interval']>;
  /** Only float tasks. Represents a minimum duration of the chunk this task needs to be divided into. */
  minChunkDuration?: Maybe<Scalars['Interval']>;
  /** Only const tasks. Describes how often the task should repeat. When representing task in time, the chunks WILL be duplicated for the sake of easier calculations. */
  repeat?: Maybe<Repeat>;
  /** The time when task should start. In case of float tasks this can be different from chunk.start, as it is just informative data unrelated with real planed entity. */
  start: Scalars['DateTime'];
};

export type ChunkInput = {
  /** Duration of the chunk. */
  duration: Scalars['Interval'];
  /** Indicator whether the chunk is done. */
  isDone: Scalars['Boolean'];
  /** The time when chunk should start. */
  start: Scalars['DateTime'];
};

export type Color = {
  __typename?: 'Color';
  hexCode: Scalars['String'];
  id: Scalars['Float'];
};

export type ConstTaskInput = {
  /** Either existing category id or new category name and color. */
  category: CategoryInput;
  /** A minimum time gap that user wants to have between this task and another tasks. */
  chillTime: Scalars['Interval'];
  duration: Scalars['Interval'];
  /** Whether the task is done or not. */
  isDone?: InputMaybe<Scalars['Boolean']>;
  /** The name of the task, which is assigned by the user and can be changed in the future. */
  name: Scalars['String'];
  priority?: Scalars['String'];
  /** Repeat options. */
  repeat?: InputMaybe<RepeatInput>;
  /** Whether or not to mark task chunk(s) as done after the time (deadline for that particular chunk) has passed. */
  shouldAutoResolve?: Scalars['Boolean'];
  /** The time when task should start. This can be different from chunk.start, as it is just informative data unrelated with real planed entity. */
  start: Scalars['DateTime'];
  /** The time before user wants to receive task notification. */
  timeBeforeNotification?: InputMaybe<Scalars['Interval']>;
};

export type CreateCategoryInput = {
  colorId: Scalars['Float'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FilterOptions = {
  category?: InputMaybe<Array<Scalars['Float']>>;
  isDone?: InputMaybe<Scalars['Boolean']>;
  isFloat?: InputMaybe<Scalars['Boolean']>;
  priority?: InputMaybe<Array<Scalars['String']>>;
  repeat?: InputMaybe<Scalars['Boolean']>;
};

export type FloatTaskInput = {
  /** Either existing category id or new category name and color. */
  category: CategoryInput;
  /** A minimum time gap that user wants to have between this task and another tasks. */
  chillTime: Scalars['Interval'];
  deadline: Scalars['DateTime'];
  estimation: Scalars['Interval'];
  /** Whether the task is done or not. */
  isDone?: InputMaybe<Scalars['Boolean']>;
  maxChunkDuration: Scalars['Interval'];
  minChunkDuration?: InputMaybe<Scalars['Interval']>;
  /** The name of the task, which is assigned by the user and can be changed in the future. */
  name: Scalars['String'];
  priority?: Scalars['String'];
  /** Whether or not to mark task chunk(s) as done after the time (deadline for that particular chunk) has passed. */
  shouldAutoResolve?: Scalars['Boolean'];
  /** The time when task should start. This can be different from chunk.start, as it is just informative data unrelated with real planed entity. */
  start: Scalars['DateTime'];
  /** The time before user wants to receive task notification. */
  timeBeforeNotification?: InputMaybe<Scalars['Interval']>;
};

export type GetTasksInput = {
  filterOptions?: InputMaybe<FilterOptions>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addConstTask: Task;
  addFloatTask: Task;
  createCategory: Category;
  createUser: User;
  googleLogin: AuthResponse;
  login: AuthResponse;
  logout: Scalars['Boolean'];
  register: AuthResponse;
  removeCategory: Category;
  removeTask: Task;
  removeUser: User;
  updateChunk: Chunk;
  updateConstTask: Task;
  updateFloatTask: Task;
  updateTask: Task;
  updateUser: User;
};


export type MutationAddConstTaskArgs = {
  ConstTaskInput: ConstTaskInput;
};


export type MutationAddFloatTaskArgs = {
  FloatTaskInput: FloatTaskInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationGoogleLoginArgs = {
  googleLoginDto: AuthGoogleLoginInput;
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


export type MutationUpdateChunkArgs = {
  chunkInput: ChunkInput;
  id: Scalars['Int'];
};


export type MutationUpdateConstTaskArgs = {
  id: Scalars['Int'];
  taskInput: ConstTaskInput;
};


export type MutationUpdateFloatTaskArgs = {
  id: Scalars['Int'];
  taskInput: FloatTaskInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['Int'];
  taskInput: TaskInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  timeBefore: Scalars['Interval'];
};

export type OrderOptions = {
  desc?: Scalars['Boolean'];
  field?: Scalars['String'];
};

export type PaginationOptions = {
  /** Max number of items to return. Max 30, default is 10 */
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  chunks: Array<Chunk>;
  findCategoryByPrefix: Array<Category>;
  getCategories: Array<Category>;
  getColors: Array<Color>;
  getTask: Task;
  getTasks: Array<Task>;
  me: User;
  tasks: Array<Task>;
};


export type QueryChunksArgs = {
  chunkFilterOptions: ChunkFilterOptions;
  orderOptions?: OrderOptions;
  paginationOptions?: PaginationOptions;
};


export type QueryFindCategoryByPrefixArgs = {
  prefix: Scalars['String'];
};


export type QueryGetTaskArgs = {
  id: Scalars['String'];
};


export type QueryGetTasksArgs = {
  getTasksInput: GetTasksInput;
};


export type QueryTasksArgs = {
  orderOptions?: OrderOptions;
  paginationOptions?: PaginationOptions;
  taskFilterOptions?: InputMaybe<TaskFilterOptions>;
};

/** Applicable only to const tasks repeat property. */
export type Repeat = {
  __typename?: 'Repeat';
  repeatEvery: Scalars['Float'];
  repeatType: Scalars['String'];
  repeatUntil?: Maybe<Scalars['DateTime']>;
};

export type RepeatInput = {
  repeatEvery?: InputMaybe<Scalars['Float']>;
  repeatType?: RepeatType;
  repeatUntil?: InputMaybe<Scalars['DateTime']>;
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
  /** The category to which the task belongs. Category needs to be created by user either before or during the task creation (in corresponding mutation). */
  category: Category;
  /** Information about timings. Chunk is a connection for task with real time, and chunkInfo stores all needed for that planning data. Const tasks have stale one chunk, while floats can have many chunks. Chunk represents task in time. This field contains chunk preferences for the concrete task. */
  chunkInfo?: Maybe<ChunkInfo>;
  chunks: Array<Chunk>;
  id: Scalars['Int'];
  /** Whether or not the whole task is done. Should be done only if all task chunks are done. */
  isDone: Scalars['Boolean'];
  /** Whether the task is a const or float. Float tasks are tasks that user want algorithm to replan according to const tasks and other float tasks. In other words const tasks have fixed start and end times. */
  isFloat: Scalars['Boolean'];
  /** The name of the task, which is assigned by the user and can be changed in the future. */
  name: Scalars['String'];
  /** Notification preferences. */
  notifications?: Maybe<Notification>;
  /** Priority is created by us once and can not be changed by users. */
  priority: Scalars['String'];
  /** Whether or not to mark task chunk(s) as done after the time (deadline for that particular chunk) has passed. */
  shouldAutoResolve: Scalars['Boolean'];
};


export type TaskChunksArgs = {
  orderOptions?: OrderOptions;
  paginationOptions?: PaginationOptions;
};

export type TaskFilterOptions = {
  category?: InputMaybe<Array<Scalars['Float']>>;
  /** Get only those tasks with id from the list. Is not applied when value is null. When list is empty - returns empty tasks list. */
  ids?: InputMaybe<Array<Scalars['Int']>>;
  isDone?: InputMaybe<Scalars['Boolean']>;
  isFloat?: InputMaybe<Scalars['Boolean']>;
  priority?: InputMaybe<Array<Scalars['String']>>;
  repeat?: InputMaybe<Scalars['Boolean']>;
};

export type TaskInput = {
  /** Either existing category id or new category name and color. */
  category: CategoryInput;
  /** A minimum time gap that user wants to have between this task and another tasks. */
  chillTime: Scalars['Interval'];
  /** Whether the task is done or not. */
  isDone?: InputMaybe<Scalars['Boolean']>;
  /** The name of the task, which is assigned by the user and can be changed in the future. */
  name: Scalars['String'];
  priority?: Scalars['String'];
  /** Whether or not to mark task chunk(s) as done after the time (deadline for that particular chunk) has passed. */
  shouldAutoResolve?: Scalars['Boolean'];
  /** The time when task should start. This can be different from chunk.start, as it is just informative data unrelated with real planed entity. */
  start: Scalars['DateTime'];
  /** The time before user wants to receive task notification. */
  timeBeforeNotification?: InputMaybe<Scalars['Interval']>;
};

export type UpdateUserInput = {
  birthDate?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  introductionCompleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  birthDate?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  introductionCompleted: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
};

export type AddConstTaskMutationVariables = Exact<{
  orderOptions: OrderOptions;
  paginationOptions: PaginationOptions;
  orderOptions1: OrderOptions;
  paginationOptions1: PaginationOptions;
  ConstTaskInput: ConstTaskInput;
}>;


export type AddConstTaskMutation = { __typename?: 'Mutation', addConstTask: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any, task?: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } | null }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } };

export type AddFloatTaskMutationVariables = Exact<{
  orderOptions: OrderOptions;
  paginationOptions: PaginationOptions;
  orderOptions1: OrderOptions;
  paginationOptions1: PaginationOptions;
  FloatTaskInput: FloatTaskInput;
}>;


export type AddFloatTaskMutation = { __typename?: 'Mutation', addFloatTask: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any, task?: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } | null }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, introductionCompleted: boolean, name?: string | null } };

export type GoogleLoginMutationVariables = Exact<{
  googleLoginDto: AuthGoogleLoginInput;
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'AuthResponse', birthDate?: any | null, email: string, gender?: string | null, id: number, introductionCompleted: boolean, name?: string | null, token?: string | null } };

export type LoginMutationVariables = Exact<{
  loginDto: AuthEmailLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', birthDate?: any | null, email: string, gender?: string | null, id: number, introductionCompleted: boolean, name?: string | null, token?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerDto: AuthEmailRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', birthDate?: any | null, email: string, gender?: string | null, id: number, introductionCompleted: boolean, name?: string | null, token?: string | null } };

export type RemoveCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeCategory: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } } };

export type RemoveTaskMutationVariables = Exact<{
  orderOptions: OrderOptions;
  paginationOptions: PaginationOptions;
  orderOptions1: OrderOptions;
  paginationOptions1: PaginationOptions;
  id: Scalars['Int'];
}>;


export type RemoveTaskMutation = { __typename?: 'Mutation', removeTask: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any, task?: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } | null }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, introductionCompleted: boolean, name?: string | null } };

export type UpdateChunkMutationVariables = Exact<{
  orderOptions: OrderOptions;
  paginationOptions: PaginationOptions;
  chunkInput: ChunkInput;
  id: Scalars['Int'];
}>;


export type UpdateChunkMutation = { __typename?: 'Mutation', updateChunk: { __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any, task?: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any, task?: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, notifications?: { __typename?: 'Notification', timeBefore: any } | null } | null }> } | null } };

export type UpdateConstTaskMutationVariables = Exact<{
  orderOptions: OrderOptions;
  paginationOptions: PaginationOptions;
  orderOptions1: OrderOptions;
  paginationOptions1: PaginationOptions;
  id: Scalars['Int'];
  taskInput: ConstTaskInput;
}>;


export type UpdateConstTaskMutation = { __typename?: 'Mutation', updateConstTask: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any, task?: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } | null }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } };

export type UpdateFloatTaskMutationVariables = Exact<{
  orderOptions: OrderOptions;
  paginationOptions: PaginationOptions;
  orderOptions1: OrderOptions;
  paginationOptions1: PaginationOptions;
  id: Scalars['Int'];
  taskInput: FloatTaskInput;
}>;


export type UpdateFloatTaskMutation = { __typename?: 'Mutation', updateFloatTask: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any, task?: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } | null }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } };

export type UpdateTaskMutationVariables = Exact<{
  orderOptions: OrderOptions;
  paginationOptions: PaginationOptions;
  orderOptions1: OrderOptions;
  paginationOptions1: PaginationOptions;
  id: Scalars['Int'];
  taskInput: TaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any, task?: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } | null }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, introductionCompleted: boolean, name?: string | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }> };

export type ChunksQueryVariables = Exact<{
  orderOptions: OrderOptions;
  paginationOptions: PaginationOptions;
  chunkFilterOptions: ChunkFilterOptions;
}>;


export type ChunksQuery = { __typename?: 'Query', chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any, task?: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, notifications?: { __typename?: 'Notification', timeBefore: any } | null } | null }> };

export type FindCategoryByPrefixQueryVariables = Exact<{
  prefix: Scalars['String'];
}>;


export type FindCategoryByPrefixQuery = { __typename?: 'Query', findCategoryByPrefix: Array<{ __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }> };

export type GetColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetColorsQuery = { __typename?: 'Query', getColors: Array<{ __typename?: 'Color', hexCode: string, id: number }> };

export type GetTaskQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTaskQuery = { __typename?: 'Query', getTask: { __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null } };

export type GetTasksQueryVariables = Exact<{
  getTasksInput: GetTasksInput;
}>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', birthDate?: any | null, email: string, gender?: string | null, id: number, introductionCompleted: boolean, name?: string | null } };

export type TasksQueryVariables = Exact<{
  orderOptions: OrderOptions;
  paginationOptions: PaginationOptions;
  orderOptions1: OrderOptions;
  paginationOptions1: PaginationOptions;
  taskFilterOptions?: InputMaybe<TaskFilterOptions>;
}>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: number, isDone: boolean, isFloat: boolean, name: string, priority: string, shouldAutoResolve: boolean, category: { __typename?: 'Category', id: number, name: string, color: { __typename?: 'Color', hexCode: string, id: number } }, chunkInfo?: { __typename?: 'ChunkInfo', chillTime: any, deadline?: string | null, duration?: any | null, estimation?: any | null, id: number, maxChunkDuration?: any | null, minChunkDuration?: any | null, start: any, repeat?: { __typename?: 'Repeat', repeatEvery: number, repeatType: string, repeatUntil?: any | null } | null } | null, chunks: Array<{ __typename?: 'Chunk', duration: any, id: number, isDone: boolean, start: any }>, notifications?: { __typename?: 'Notification', timeBefore: any } | null }> };


export const AddConstTaskDocument = gql`
    mutation addConstTask($orderOptions: OrderOptions!, $paginationOptions: PaginationOptions!, $orderOptions1: OrderOptions!, $paginationOptions1: PaginationOptions!, $ConstTaskInput: ConstTaskInput!) {
  addConstTask(ConstTaskInput: $ConstTaskInput) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chunkInfo {
      chillTime
      deadline
      duration
      estimation
      id
      maxChunkDuration
      minChunkDuration
      repeat {
        repeatEvery
        repeatType
        repeatUntil
      }
      start
    }
    chunks(orderOptions: $orderOptions1, paginationOptions: $paginationOptions1) {
      duration
      id
      isDone
      start
      task {
        category {
          id
          name
        }
        chunkInfo {
          chillTime
          deadline
          duration
          estimation
          id
          maxChunkDuration
          minChunkDuration
          start
        }
        chunks(orderOptions: $orderOptions, paginationOptions: $paginationOptions) {
          duration
          id
          isDone
          start
        }
        id
        isDone
        isFloat
        name
        notifications {
          timeBefore
        }
        priority
        shouldAutoResolve
      }
    }
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority
    shouldAutoResolve
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
 *      orderOptions: // value for 'orderOptions'
 *      paginationOptions: // value for 'paginationOptions'
 *      orderOptions1: // value for 'orderOptions1'
 *      paginationOptions1: // value for 'paginationOptions1'
 *      ConstTaskInput: // value for 'ConstTaskInput'
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
export const AddFloatTaskDocument = gql`
    mutation addFloatTask($orderOptions: OrderOptions!, $paginationOptions: PaginationOptions!, $orderOptions1: OrderOptions!, $paginationOptions1: PaginationOptions!, $FloatTaskInput: FloatTaskInput!) {
  addFloatTask(FloatTaskInput: $FloatTaskInput) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chunkInfo {
      chillTime
      deadline
      duration
      estimation
      id
      maxChunkDuration
      minChunkDuration
      repeat {
        repeatEvery
        repeatType
        repeatUntil
      }
      start
    }
    chunks(orderOptions: $orderOptions1, paginationOptions: $paginationOptions1) {
      duration
      id
      isDone
      start
      task {
        category {
          id
          name
        }
        chunkInfo {
          chillTime
          deadline
          duration
          estimation
          id
          maxChunkDuration
          minChunkDuration
          start
        }
        chunks(orderOptions: $orderOptions, paginationOptions: $paginationOptions) {
          duration
          id
          isDone
          start
        }
        id
        isDone
        isFloat
        name
        notifications {
          timeBefore
        }
        priority
        shouldAutoResolve
      }
    }
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority
    shouldAutoResolve
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
 *      orderOptions: // value for 'orderOptions'
 *      paginationOptions: // value for 'paginationOptions'
 *      orderOptions1: // value for 'orderOptions1'
 *      paginationOptions1: // value for 'paginationOptions1'
 *      FloatTaskInput: // value for 'FloatTaskInput'
 *   },
 * });
 */
export function useAddFloatTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddFloatTaskMutation, AddFloatTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
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
        const options = {...defaultOptions, ...baseOptions}
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
    introductionCompleted
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GoogleLoginDocument = gql`
    mutation googleLogin($googleLoginDto: AuthGoogleLoginInput!) {
  googleLogin(googleLoginDto: $googleLoginDto) {
    birthDate
    email
    gender
    id
    introductionCompleted
    name
    token
  }
}
    `;
export type GoogleLoginMutationFn = Apollo.MutationFunction<GoogleLoginMutation, GoogleLoginMutationVariables>;

/**
 * __useGoogleLoginMutation__
 *
 * To run a mutation, you first call `useGoogleLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleLoginMutation, { data, loading, error }] = useGoogleLoginMutation({
 *   variables: {
 *      googleLoginDto: // value for 'googleLoginDto'
 *   },
 * });
 */
export function useGoogleLoginMutation(baseOptions?: Apollo.MutationHookOptions<GoogleLoginMutation, GoogleLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument, options);
      }
export type GoogleLoginMutationHookResult = ReturnType<typeof useGoogleLoginMutation>;
export type GoogleLoginMutationResult = Apollo.MutationResult<GoogleLoginMutation>;
export type GoogleLoginMutationOptions = Apollo.BaseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const LoginDocument = gql`
    mutation login($loginDto: AuthEmailLoginInput!) {
  login(loginDto: $loginDto) {
    birthDate
    email
    gender
    id
    introductionCompleted
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
        const options = {...defaultOptions, ...baseOptions}
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
        const options = {...defaultOptions, ...baseOptions}
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
    introductionCompleted
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
        const options = {...defaultOptions, ...baseOptions}
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCategoryMutation, RemoveCategoryMutationVariables>(RemoveCategoryDocument, options);
      }
export type RemoveCategoryMutationHookResult = ReturnType<typeof useRemoveCategoryMutation>;
export type RemoveCategoryMutationResult = Apollo.MutationResult<RemoveCategoryMutation>;
export type RemoveCategoryMutationOptions = Apollo.BaseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const RemoveTaskDocument = gql`
    mutation removeTask($orderOptions: OrderOptions!, $paginationOptions: PaginationOptions!, $orderOptions1: OrderOptions!, $paginationOptions1: PaginationOptions!, $id: Int!) {
  removeTask(id: $id) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chunkInfo {
      chillTime
      deadline
      duration
      estimation
      id
      maxChunkDuration
      minChunkDuration
      repeat {
        repeatEvery
        repeatType
        repeatUntil
      }
      start
    }
    chunks(orderOptions: $orderOptions1, paginationOptions: $paginationOptions1) {
      duration
      id
      isDone
      start
      task {
        category {
          id
          name
        }
        chunkInfo {
          chillTime
          deadline
          duration
          estimation
          id
          maxChunkDuration
          minChunkDuration
          start
        }
        chunks(orderOptions: $orderOptions, paginationOptions: $paginationOptions) {
          duration
          id
          isDone
          start
        }
        id
        isDone
        isFloat
        name
        notifications {
          timeBefore
        }
        priority
        shouldAutoResolve
      }
    }
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority
    shouldAutoResolve
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
 *      orderOptions: // value for 'orderOptions'
 *      paginationOptions: // value for 'paginationOptions'
 *      orderOptions1: // value for 'orderOptions1'
 *      paginationOptions1: // value for 'paginationOptions1'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTaskMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTaskMutation, RemoveTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
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
    introductionCompleted
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UpdateChunkDocument = gql`
    mutation updateChunk($orderOptions: OrderOptions!, $paginationOptions: PaginationOptions!, $chunkInput: ChunkInput!, $id: Int!) {
  updateChunk(chunkInput: $chunkInput, id: $id) {
    duration
    id
    isDone
    start
    task {
      category {
        color {
          hexCode
          id
        }
        id
        name
      }
      chunkInfo {
        chillTime
        deadline
        duration
        estimation
        id
        maxChunkDuration
        minChunkDuration
        repeat {
          repeatEvery
          repeatType
          repeatUntil
        }
        start
      }
      chunks(orderOptions: $orderOptions, paginationOptions: $paginationOptions) {
        duration
        id
        isDone
        start
        task {
          id
          isDone
          isFloat
          name
          notifications {
            timeBefore
          }
          priority
          shouldAutoResolve
        }
      }
      id
      isDone
      isFloat
      name
      priority
      shouldAutoResolve
    }
  }
}
    `;
export type UpdateChunkMutationFn = Apollo.MutationFunction<UpdateChunkMutation, UpdateChunkMutationVariables>;

/**
 * __useUpdateChunkMutation__
 *
 * To run a mutation, you first call `useUpdateChunkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChunkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChunkMutation, { data, loading, error }] = useUpdateChunkMutation({
 *   variables: {
 *      orderOptions: // value for 'orderOptions'
 *      paginationOptions: // value for 'paginationOptions'
 *      chunkInput: // value for 'chunkInput'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateChunkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChunkMutation, UpdateChunkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChunkMutation, UpdateChunkMutationVariables>(UpdateChunkDocument, options);
      }
export type UpdateChunkMutationHookResult = ReturnType<typeof useUpdateChunkMutation>;
export type UpdateChunkMutationResult = Apollo.MutationResult<UpdateChunkMutation>;
export type UpdateChunkMutationOptions = Apollo.BaseMutationOptions<UpdateChunkMutation, UpdateChunkMutationVariables>;
export const UpdateConstTaskDocument = gql`
    mutation updateConstTask($orderOptions: OrderOptions!, $paginationOptions: PaginationOptions!, $orderOptions1: OrderOptions!, $paginationOptions1: PaginationOptions!, $id: Int!, $taskInput: ConstTaskInput!) {
  updateConstTask(id: $id, taskInput: $taskInput) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chunkInfo {
      chillTime
      deadline
      duration
      estimation
      id
      maxChunkDuration
      minChunkDuration
      repeat {
        repeatEvery
        repeatType
        repeatUntil
      }
      start
    }
    chunks(orderOptions: $orderOptions1, paginationOptions: $paginationOptions1) {
      duration
      id
      isDone
      start
      task {
        category {
          id
          name
        }
        chunkInfo {
          chillTime
          deadline
          duration
          estimation
          id
          maxChunkDuration
          minChunkDuration
          start
        }
        chunks(orderOptions: $orderOptions, paginationOptions: $paginationOptions) {
          duration
          id
          isDone
          start
        }
        id
        isDone
        isFloat
        name
        notifications {
          timeBefore
        }
        priority
        shouldAutoResolve
      }
    }
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority
    shouldAutoResolve
  }
}
    `;
export type UpdateConstTaskMutationFn = Apollo.MutationFunction<UpdateConstTaskMutation, UpdateConstTaskMutationVariables>;

/**
 * __useUpdateConstTaskMutation__
 *
 * To run a mutation, you first call `useUpdateConstTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConstTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConstTaskMutation, { data, loading, error }] = useUpdateConstTaskMutation({
 *   variables: {
 *      orderOptions: // value for 'orderOptions'
 *      paginationOptions: // value for 'paginationOptions'
 *      orderOptions1: // value for 'orderOptions1'
 *      paginationOptions1: // value for 'paginationOptions1'
 *      id: // value for 'id'
 *      taskInput: // value for 'taskInput'
 *   },
 * });
 */
export function useUpdateConstTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConstTaskMutation, UpdateConstTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConstTaskMutation, UpdateConstTaskMutationVariables>(UpdateConstTaskDocument, options);
      }
export type UpdateConstTaskMutationHookResult = ReturnType<typeof useUpdateConstTaskMutation>;
export type UpdateConstTaskMutationResult = Apollo.MutationResult<UpdateConstTaskMutation>;
export type UpdateConstTaskMutationOptions = Apollo.BaseMutationOptions<UpdateConstTaskMutation, UpdateConstTaskMutationVariables>;
export const UpdateFloatTaskDocument = gql`
    mutation updateFloatTask($orderOptions: OrderOptions!, $paginationOptions: PaginationOptions!, $orderOptions1: OrderOptions!, $paginationOptions1: PaginationOptions!, $id: Int!, $taskInput: FloatTaskInput!) {
  updateFloatTask(id: $id, taskInput: $taskInput) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chunkInfo {
      chillTime
      deadline
      duration
      estimation
      id
      maxChunkDuration
      minChunkDuration
      repeat {
        repeatEvery
        repeatType
        repeatUntil
      }
      start
    }
    chunks(orderOptions: $orderOptions1, paginationOptions: $paginationOptions1) {
      duration
      id
      isDone
      start
      task {
        category {
          id
          name
        }
        chunkInfo {
          chillTime
          deadline
          duration
          estimation
          id
          maxChunkDuration
          minChunkDuration
          start
        }
        chunks(orderOptions: $orderOptions, paginationOptions: $paginationOptions) {
          duration
          id
          isDone
          start
        }
        id
        isDone
        isFloat
        name
        notifications {
          timeBefore
        }
        priority
        shouldAutoResolve
      }
    }
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority
    shouldAutoResolve
  }
}
    `;
export type UpdateFloatTaskMutationFn = Apollo.MutationFunction<UpdateFloatTaskMutation, UpdateFloatTaskMutationVariables>;

/**
 * __useUpdateFloatTaskMutation__
 *
 * To run a mutation, you first call `useUpdateFloatTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFloatTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFloatTaskMutation, { data, loading, error }] = useUpdateFloatTaskMutation({
 *   variables: {
 *      orderOptions: // value for 'orderOptions'
 *      paginationOptions: // value for 'paginationOptions'
 *      orderOptions1: // value for 'orderOptions1'
 *      paginationOptions1: // value for 'paginationOptions1'
 *      id: // value for 'id'
 *      taskInput: // value for 'taskInput'
 *   },
 * });
 */
export function useUpdateFloatTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFloatTaskMutation, UpdateFloatTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFloatTaskMutation, UpdateFloatTaskMutationVariables>(UpdateFloatTaskDocument, options);
      }
export type UpdateFloatTaskMutationHookResult = ReturnType<typeof useUpdateFloatTaskMutation>;
export type UpdateFloatTaskMutationResult = Apollo.MutationResult<UpdateFloatTaskMutation>;
export type UpdateFloatTaskMutationOptions = Apollo.BaseMutationOptions<UpdateFloatTaskMutation, UpdateFloatTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($orderOptions: OrderOptions!, $paginationOptions: PaginationOptions!, $orderOptions1: OrderOptions!, $paginationOptions1: PaginationOptions!, $id: Int!, $taskInput: TaskInput!) {
  updateTask(id: $id, taskInput: $taskInput) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chunkInfo {
      chillTime
      deadline
      duration
      estimation
      id
      maxChunkDuration
      minChunkDuration
      repeat {
        repeatEvery
        repeatType
        repeatUntil
      }
      start
    }
    chunks(orderOptions: $orderOptions1, paginationOptions: $paginationOptions1) {
      duration
      id
      isDone
      start
      task {
        category {
          id
          name
        }
        chunkInfo {
          chillTime
          deadline
          duration
          estimation
          id
          maxChunkDuration
          minChunkDuration
          start
        }
        chunks(orderOptions: $orderOptions, paginationOptions: $paginationOptions) {
          duration
          id
          isDone
          start
        }
        id
        isDone
        isFloat
        name
        notifications {
          timeBefore
        }
        priority
        shouldAutoResolve
      }
    }
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority
    shouldAutoResolve
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
 *      orderOptions: // value for 'orderOptions'
 *      paginationOptions: // value for 'paginationOptions'
 *      orderOptions1: // value for 'orderOptions1'
 *      paginationOptions1: // value for 'paginationOptions1'
 *      id: // value for 'id'
 *      taskInput: // value for 'taskInput'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
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
    introductionCompleted
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CategoriesDocument = gql`
    query categories {
  categories {
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
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const ChunksDocument = gql`
    query chunks($orderOptions: OrderOptions!, $paginationOptions: PaginationOptions!, $chunkFilterOptions: ChunkFilterOptions!) {
  chunks(
    chunkFilterOptions: $chunkFilterOptions
    orderOptions: $orderOptions
    paginationOptions: $paginationOptions
  ) {
    duration
    id
    isDone
    start
    task {
      category {
        color {
          hexCode
          id
        }
        id
        name
      }
      chunkInfo {
        chillTime
        deadline
        duration
        estimation
        id
        maxChunkDuration
        minChunkDuration
        repeat {
          repeatEvery
          repeatType
          repeatUntil
        }
        start
      }
      id
      isDone
      isFloat
      name
      notifications {
        timeBefore
      }
      priority
      shouldAutoResolve
    }
  }
}
    `;

/**
 * __useChunksQuery__
 *
 * To run a query within a React component, call `useChunksQuery` and pass it any options that fit your needs.
 * When your component renders, `useChunksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChunksQuery({
 *   variables: {
 *      orderOptions: // value for 'orderOptions'
 *      paginationOptions: // value for 'paginationOptions'
 *      chunkFilterOptions: // value for 'chunkFilterOptions'
 *   },
 * });
 */
export function useChunksQuery(baseOptions: Apollo.QueryHookOptions<ChunksQuery, ChunksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChunksQuery, ChunksQueryVariables>(ChunksDocument, options);
      }
export function useChunksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChunksQuery, ChunksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChunksQuery, ChunksQueryVariables>(ChunksDocument, options);
        }
export type ChunksQueryHookResult = ReturnType<typeof useChunksQuery>;
export type ChunksLazyQueryHookResult = ReturnType<typeof useChunksLazyQuery>;
export type ChunksQueryResult = Apollo.QueryResult<ChunksQuery, ChunksQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCategoryByPrefixQuery, FindCategoryByPrefixQueryVariables>(FindCategoryByPrefixDocument, options);
      }
export function useFindCategoryByPrefixLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCategoryByPrefixQuery, FindCategoryByPrefixQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCategoryByPrefixQuery, FindCategoryByPrefixQueryVariables>(FindCategoryByPrefixDocument, options);
        }
export type FindCategoryByPrefixQueryHookResult = ReturnType<typeof useFindCategoryByPrefixQuery>;
export type FindCategoryByPrefixLazyQueryHookResult = ReturnType<typeof useFindCategoryByPrefixLazyQuery>;
export type FindCategoryByPrefixQueryResult = Apollo.QueryResult<FindCategoryByPrefixQuery, FindCategoryByPrefixQueryVariables>;
export const GetCategoriesDocument = gql`
    query getCategories {
  getCategories {
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
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetColorsDocument = gql`
    query getColors {
  getColors {
    hexCode
    id
  }
}
    `;

/**
 * __useGetColorsQuery__
 *
 * To run a query within a React component, call `useGetColorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetColorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetColorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetColorsQuery(baseOptions?: Apollo.QueryHookOptions<GetColorsQuery, GetColorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetColorsQuery, GetColorsQueryVariables>(GetColorsDocument, options);
      }
export function useGetColorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetColorsQuery, GetColorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetColorsQuery, GetColorsQueryVariables>(GetColorsDocument, options);
        }
export type GetColorsQueryHookResult = ReturnType<typeof useGetColorsQuery>;
export type GetColorsLazyQueryHookResult = ReturnType<typeof useGetColorsLazyQuery>;
export type GetColorsQueryResult = Apollo.QueryResult<GetColorsQuery, GetColorsQueryVariables>;
export const GetTaskDocument = gql`
    query getTask($id: String!) {
  getTask(id: $id) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chunkInfo {
      chillTime
      deadline
      duration
      estimation
      id
      maxChunkDuration
      minChunkDuration
      repeat {
        repeatEvery
        repeatType
        repeatUntil
      }
      start
    }
    chunks {
      duration
      id
      isDone
      start
    }
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority
    shouldAutoResolve
  }
}
    `;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
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
    chunkInfo {
      chillTime
      deadline
      duration
      estimation
      id
      maxChunkDuration
      minChunkDuration
      repeat {
        repeatEvery
        repeatType
        repeatUntil
      }
      start
    }
    chunks {
      duration
      id
      isDone
      start
    }
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority
    shouldAutoResolve
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
    introductionCompleted
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
export const TasksDocument = gql`
    query tasks($orderOptions: OrderOptions!, $paginationOptions: PaginationOptions!, $orderOptions1: OrderOptions!, $paginationOptions1: PaginationOptions!, $taskFilterOptions: TaskFilterOptions) {
  tasks(
    orderOptions: $orderOptions
    paginationOptions: $paginationOptions
    taskFilterOptions: $taskFilterOptions
  ) {
    category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chunkInfo {
      chillTime
      deadline
      duration
      estimation
      id
      maxChunkDuration
      minChunkDuration
      repeat {
        repeatEvery
        repeatType
        repeatUntil
      }
      start
    }
    chunks(orderOptions: $orderOptions1, paginationOptions: $paginationOptions1) {
      duration
      id
      isDone
      start
    }
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority
    shouldAutoResolve
  }
}
    `;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      orderOptions: // value for 'orderOptions'
 *      paginationOptions: // value for 'paginationOptions'
 *      orderOptions1: // value for 'orderOptions1'
 *      paginationOptions1: // value for 'paginationOptions1'
 *      taskFilterOptions: // value for 'taskFilterOptions'
 *   },
 * });
 */
export function useTasksQuery(baseOptions: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
      }
export function useTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
        }
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksQueryResult = Apollo.QueryResult<TasksQuery, TasksQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    