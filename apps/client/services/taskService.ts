import router from 'next/router';
import moment from 'moment';
import {
  ConstTaskInput,
  FloatTaskInput,
  RepeatType,
  Task,
} from '@agh-kiwis/data-access';
import {
  addMinutes,
  getIntervalISOString,
  mapToDateTime,
} from '@agh-kiwis/moment-service';
import { ConstTaskType, FloatTaskType } from '@agh-kiwis/types';

// create
export const constTaskFormToAddTaskMutationMapper = (
  variables: ConstTaskType
): ConstTaskInput => ({
  category: {
    id: variables.category.id,
  },
  name: variables.taskName,
  priority: variables.priority,
  start: mapToDateTime(variables.startTime.date, variables.startTime.time),
  duration: getIntervalISOString(variables.duration),
  chillTime: getIntervalISOString(variables.chillTime),
  repeat: variables.repeat.shouldRepeat
    ? {
        repeatEvery: variables.repeat.repeatEvery.amount,
        repeatType: mapFormRepeatToRepeatType(
          variables.repeat.repeatEvery.type
        ),
        repeatUntil: variables.repeat.repeatUntil,
      }
    : undefined,
  shouldAutoResolve: variables.autoResolve,
  timeBeforeNotification: null,
});

export const floatTaskFormToAddTaskMutationMapper = (
  variables: FloatTaskType
): FloatTaskInput => ({
  category: {
    id: variables.category.id,
  },
  name: variables.taskName,
  priority: variables.priority,
  start: addMinutes(new Date(), 10),
  deadline: mapToDateTime(variables.deadline.date, variables.deadline.time),
  estimation: getIntervalISOString(variables.timeEstimation),
  chillTime: getIntervalISOString(variables.chillTime),
  minTimeBetweenChunks: getIntervalISOString(
    variables.chunking.minTimeBetweenChunks
  ),
  minChunkDuration: getIntervalISOString(variables.chunking.minChunkTime),
  maxChunkDuration: getIntervalISOString(variables.chunking.maxChunkTime),
  shouldAutoResolve: variables.autoResolve,
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
    date: moment(task.chunks[0].start).format('yyyy-MM-DD'),
    time: moment(task.chunks[0].start).format('HH:mm'),
  },
  startTimeFacade: '',
  duration: {
    hours: moment.duration(task.chunks[0].duration).hours(),
    minutes: moment.duration(task.chunks[0].duration).minutes(),
  },
  durationFacade: '',
  chillTime: {
    minutes: moment.duration(task.chunkInfo.chillTime).minutes(),
  },
  chillTimeFacade: '',
  priority: task.priority,
  repeat: {
    shouldRepeat: !!task.chunkInfo.repeat,
    repeatEvery: {
      type: mapRepeatTypeToFormRepeat(task.chunkInfo.repeat?.repeatType),
      amount: task.chunkInfo.repeat?.repeatEvery
        ? task.chunkInfo.repeat?.repeatEvery
        : 1,
    },
    repeatUntil: moment(task.chunkInfo.repeat.repeatUntil).format('yyyy-MM-DD'),
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
    date: moment(task.chunkInfo.deadline, 'x').format('yyyy-MM-DD'),
    time: moment(task.chunkInfo.deadline, 'x').format('HH:mm'),
  },
  deadlineFacade: '',
  timeEstimation: {
    hours: moment.duration(task.chunkInfo.estimation).hours(),
    minutes: moment.duration(task.chunkInfo.estimation).minutes(),
  },
  timeEstimationFacade: '',
  chillTime: {
    minutes: moment.duration(task.chunkInfo.chillTime).minutes(),
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
      hours: moment.duration(task.chunkInfo.chillTime).hours(),
      minutes: moment.duration(task.chunkInfo.chillTime).minutes(),
    },
  },
  minChunkTimeFacade: '',
  maxChunkTimeFacade: '',
  minTimeBetweenChunksFacade: '',
  notify: !!task.notifications,
  autoResolve: task.shouldAutoResolve,
});

// update
// TODO improve update task mutation to update chunks
export const constTaskToUpdateTaskMutationMapper = (
  variables: ConstTaskType
): ConstTaskInput => ({
  category: {
    id: variables.category.id,
  },
  name: variables.taskName,
  priority: variables.priority,
  chillTime: getIntervalISOString(variables.chillTime),
  duration: getIntervalISOString(variables.duration),
  repeat: {
    repeatEvery: variables.repeat.repeatEvery.amount,
    repeatType: mapFormRepeatToRepeatType(variables.repeat.repeatEvery.type),
  },
  start: mapToDateTime(variables.startTime.date, variables.startTime.time),
  shouldAutoResolve: variables.autoResolve,
  timeBeforeNotification: null,
});

export const floatTaskToUpdateTaskMutationMapper = (
  variables: FloatTaskType
): FloatTaskInput => ({
  category: {
    id: variables.category.id,
  },
  name: variables.taskName,
  priority: variables.priority,
  chillTime: getIntervalISOString(variables.chillTime),
  minChunkDuration: getIntervalISOString(variables.chunking.minChunkTime),
  maxChunkDuration: getIntervalISOString(variables.chunking.maxChunkTime),
  minTimeBetweenChunks: getIntervalISOString(
    variables.chunking.minTimeBetweenChunks
  ),
  deadline: mapToDateTime(variables.deadline.date, variables.deadline.time),
  estimation: getIntervalISOString(variables.timeEstimation),
  start: new Date(),
  shouldAutoResolve: variables.autoResolve,
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

export const handleConstTaskSubmit = async (
  values: ConstTaskType,
  addConstTaskMutation,
  route = '/'
) => {
  const taskResponse = await addConstTaskMutation({
    variables: {
      ConstTaskInput: constTaskFormToAddTaskMutationMapper(values),
    },
  }).catch((error) => {
    // TODO handle error
    console.log(error);
  });

  if (taskResponse) {
    // TODO handle success
    router.push(route);
  }
};

export const handleFloatTaskSubmit = async (
  values: FloatTaskType,
  addFloatTaskMutation
) => {
  const taskResponse = await addFloatTaskMutation({
    variables: {
      FloatTaskInput: floatTaskFormToAddTaskMutationMapper(values),
    },
  }).catch((error) => {
    // TODO handle error
    console.log(error);
  });

  if (taskResponse) {
    // TODO handle success
    router.push('/');
  }
};
