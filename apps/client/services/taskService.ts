import moment from 'moment';
import {
  CreateConstTaskInput,
  CreateFloatTaskInput,
  RepeatType,
  Task,
  TaskInput,
} from '@agh-kiwis/data-access';
import {
  getIntervalISOString,
  mapToDateTime,
  roundToMinutes,
} from '@agh-kiwis/moment-service';
import { ConstTaskType, FloatTaskType } from '@agh-kiwis/types';

// create
export const constTaskFormToAddTaskMutationMapper = (
  variables: ConstTaskType
): CreateConstTaskInput => ({
  category: {
    id: variables.category.id,
  },
  chillTime: getIntervalISOString(variables.chillTime),
  duration: getIntervalISOString(variables.duration),
  name: variables.taskName,
  priority: variables.priority,
  repeat: variables.repeat.shouldRepeat
    ? {
        repeatEvery: variables.repeat.repeatEvery.amount,
        startFrom: mapToDateTime(variables.repeat.startFrom),
        repeatType: mapFormRepeatToRepeatType(
          variables.repeat.repeatEvery.type
        ),
      }
    : undefined,
  start: mapToDateTime(variables.startTime.date, variables.startTime.time),
  shouldAutoResolve: variables.autoResolve,
  timeBeforeNotification: null,
});

export const floatTaskFormToAddTaskMutationMapper = (
  variables: FloatTaskType
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
  shouldAutoResolve: variables.autoResolve,
  // TODO what is start regarding float task?
  start: new Date(),
  timeBeforeNotification: null,
});

// prepopulate
export const taskToConstTaskType = (task: Task): ConstTaskType => ({
  type: 'const',
  category: {
    id: task.category.id,
    name: task.category.name,
    color: task.category.color.hexCode,
  },
  taskName: task.name,
  startTime: {
    date: moment(task.taskBreakdowns[0].start).format('yyyy-MM-DD'),
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
    startFrom: moment(task.taskBreakdowns[0].repeat?.startFrom).format(
      'yyyy-MM-DD'
    ),
    repeatEvery: {
      type: mapRepeatTypeToFormRepeat(
        task.taskBreakdowns[0].repeat?.repeatType
      ),
      amount: task.taskBreakdowns[0].repeat?.repeatEvery
        ? task.taskBreakdowns[0].repeat?.repeatEvery
        : 1,
    },
  },
  repeatEveryFacade: '',
  notify: !!task.notifications,
  autoResolve: task.shouldAutoResolve,
});

export const taskToFloatTaskType = (task: Task): FloatTaskType => ({
  type: 'const',
  category: {
    id: task.category.id,
    name: task.category.name,
    color: task.category.color.hexCode,
  },
  taskName: task.name,
  deadline: {
    date: moment(task.deadline, 'x').format('yyyy-MM-DD'),
    time: roundToMinutes(moment(task.deadline, 'x'), 10),
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
  autoResolve: task.shouldAutoResolve,
});

// update
// TODO improve update task mutation to update task breakdowns
export const constTaskToUpdateTaskMutationMapper = (
  id: number,
  variables: ConstTaskType
): TaskInput => ({
  id: id,
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
    repeatType: mapFormRepeatToRepeatType(variables.repeat.repeatEvery.type),
  },
  start: mapToDateTime(variables.startTime.date, variables.startTime.time),
  shouldAutoResolve: variables.autoResolve,
  timeBeforeNotification: null,
});

export const floatTaskToUpdateTaskMutationMapper = (
  id: number,
  variables: FloatTaskType
): TaskInput => ({
  id: id,
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
  shouldAutoResolve: variables.autoResolve,
  start: new Date(),
  timeBeforeNotification: null,
});

const mapFormRepeatToRepeatType = (repeatType: string): RepeatType => {
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

const mapRepeatTypeToFormRepeat = (repeatType: string): string => {
  switch (repeatType) {
    case 'Days':
      return 'Day';
    case 'Weeks':
      return 'Week';
    case 'Months':
      return 'Month';
    case 'Years':
      return 'Year';
    default:
      return 'Day';
  }
};
