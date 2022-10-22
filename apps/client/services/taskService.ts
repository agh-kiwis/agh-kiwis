import moment from 'moment';
import {
  CreateConstTaskInput,
  CreateFloatTaskInput,
  RepeatType,
  Task,
  TaskInput,
} from '@agh-kiwis/data-access';
import { roundToMinutes } from '@agh-kiwis/moment-service';
import { constTaskType, floatTaskType } from '@agh-kiwis/types';

// create
export const constTaskFormToAddTaskMutationMapper = (
  variables: constTaskType
): CreateConstTaskInput => ({
  category: {
    id: variables.category.id,
  },
  chillTime: getIntervalISOString(variables.chillTime),
  duration: getIntervalISOString(variables.duration),
  name: variables.taskName,
  priority: variables.priority,
  repeat: {
    repeatEvery: variables.repeat.repeatEvery.amount,
    startFrom: mapToDateTime(variables.startTime.date),
    repeatType: mapRepeatType(variables.repeat.repeatEvery.type),
  },
  start: mapToDateTime(variables.startTime.date, variables.startTime.time),
  shouldAutoResolve: variables.autoresolve,
  timeBeforeNotification: null,
});

export const floatTaskFormToAddTaskMutationMapper = (
  variables: floatTaskType
): CreateFloatTaskInput => ({
  category: {
    id: variables.category.id,
  },
  chillTime: getIntervalISOString(variables.chillTime),
  chunkInfo: {
    minChunkDuration: getIntervalISOString(variables.chunking.minChunkTime),
    maxChunkDuration: getIntervalISOString(variables.chunking.maxChunkTime),
    minTimeBetweenChunks: getIntervalISOString(
      variables.chunking.minTimeBetweenChunks
    ),
  },
  deadline: mapToDateTime(variables.deadline.date, variables.deadline.time),
  estimation: getIntervalISOString(variables.timeEstimation),
  name: variables.taskName,
  priority: variables.priority,
  shouldAutoResolve: variables.autoresolve,
  // TODO what is start regarding float task?
  start: new Date(),
  timeBeforeNotification: null,
});

// prepopulate
export const taskToConstTaskType = (task: Task): constTaskType => ({
  type: 'const',
  category: {
    id: task.category.id,
    name: task.category.name,
    color: task.category.color.hexCode,
  },
  color: task.category.color.hexCode,
  taskName: task.name,
  startTime: {
    date: moment(task.taskBreakdowns[0].start).format('YYYY-MM-DD'),
    time: roundToMinutes(moment(task.taskBreakdowns[0].start), 10),
  },
  startTimeFacade: '',
  duration: {
    hours: moment.duration(task.taskBreakdowns[0].duration).hours(),
    minutes: moment.duration(task.taskBreakdowns[0].duration).minutes(),
  },
  durationFacade: '',
  chillTime: {
    minutes: moment.duration(task.chillTime).minutes(),
  },
  chillTimeFacade: '',
  priority: task.priority,
  repeat: {
    shouldRepeat: !!task.taskBreakdowns[0].repeat,
    startFrom: moment(task.taskBreakdowns[0].repeat.startFrom).format(
      'yyyy-MM-DD'
    ),
    repeatEvery: {
      type: 'Day', // to be mapped
      amount: 1, // to be mapped
    },
  },
  repeatEveryFacade: '',
  notify: !!task.notifications,
  autoresolve: task.shouldAutoResolve,
});

export const taskToFloatTaskType = (task: Task): floatTaskType => ({
  type: 'const',
  category: {
    id: task.category.id,
    name: task.category.name,
    color: task.category.color.hexCode,
  },
  color: task.category.color.hexCode,
  taskName: task.name,
  deadline: {
    date: moment(task.deadline).format('yyyy-MM-DD'),
    time: roundToMinutes(moment(task.deadline), 10),
  },
  deadlineFacade: '',
  timeEstimation: {
    hours: moment.duration(task.estimation).hours(),
    minutes: moment.duration(task.estimation).minutes(),
  },
  timeEstimationFacade: '',
  chillTime: {
    minutes: moment.duration(task.chillTime).minutes(),
  },
  chillTimeFacade: '',
  priority: task.priority,
  chunking: {
    shouldChunk: !!task.chunkInfo,
    minChunkTime: {
      minutes: moment.duration(task.chunkInfo.minChunkDuration).minutes(),
    },
    maxChunkTime: {
      hours: moment.duration(task.chunkInfo.maxChunkDuration).hours(),
      minutes: moment.duration(task.chunkInfo.maxChunkDuration).minutes(),
    },
    minTimeBetweenChunks: {
      hours: moment.duration(task.chunkInfo.minTimeBetweenChunks).hours(),
      minutes: moment.duration(task.chunkInfo.minTimeBetweenChunks).minutes(),
    },
  },
  minChunkTimeFacade: '',
  maxChunkTimeFacade: '',
  minTimeBetweenChunksFacade: '',
  notify: !!task.notifications,
  autoresolve: task.shouldAutoResolve,
});

// update
// TODO improve update task mutation to update task breakdowns
export const constTaskToUpdateTaskMutationMapper = (
  id: number,
  variables: constTaskType
): TaskInput => ({
  id: id,
  category: {
    id: variables.category.id,
  },
  chillTime: getIntervalISOString(variables.chillTime),
  // duration: getIntervalISOString(variables.duration),
  name: variables.taskName,
  priority: variables.priority,
  // repeat: {
  //   repeatEvery: variables.repeat.repeatEvery.amount,
  //   startFrom: mapToDateTime(variables.startTime.date),
  //   repeatType: mapRepeatType(variables.repeat.repeatEvery.type),
  // },
  // start: mapToDateTime(variables.startTime.date, variables.startTime.time),
  shouldAutoResolve: variables.autoresolve,
  // timeBeforeNotification: null,
});

export const floatTaskToUpdateTaskMutationMapper = (
  id: number,
  variables: floatTaskType
): TaskInput => ({
  id: id,
  category: {
    id: variables.category.id,
  },
  chillTime: getIntervalISOString(variables.chillTime),
  // chunkInfo: {
  //   minChunkDuration: getIntervalISOString(variables.chunking.minChunkTime),
  //   maxChunkDuration: getIntervalISOString(variables.chunking.maxChunkTime),
  //   minTimeBetweenChunks: getIntervalISOString(
  //     variables.chunking.minTimeBetweenChunks
  //   ),
  // },
  deadline: mapToDateTime(variables.deadline.date, variables.deadline.time),
  estimation: getIntervalISOString(variables.timeEstimation),
  name: variables.taskName,
  priority: variables.priority,
  shouldAutoResolve: variables.autoresolve,
  // start: new Date(),
  // timeBeforeNotification: null,
});

type intervalType = {
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
};

const getIntervalISOString = (interval: intervalType): string => {
  return moment.duration(interval).toISOString();
};

const mapRepeatType = (repeatType: string): RepeatType => {
  switch (repeatType) {
    case 'Day':
      return RepeatType.Days;
    case 'Week':
      return RepeatType.Weeks;
    case 'Month':
      return RepeatType.Months;
    case 'Year':
      return RepeatType.Years;
  }
};

const mapToDateTime = (date: string, time?: string): Date => {
  console.log(date, time);
  if (!time) {
    return new Date(date);
  }

  const splittedTime = time.split(':');
  const dateTime = new Date(date);
  dateTime.setHours(parseInt(splittedTime[0]));
  dateTime.setMinutes(parseInt(splittedTime[1]));

  return dateTime;
};
