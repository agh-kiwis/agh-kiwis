import moment from 'moment';
import {
  CreateConstTaskInput,
  CreateFloatTaskInput,
  RepeatType,
} from '@agh-kiwis/data-access';
import { constTaskType, floatTaskType } from '@agh-kiwis/types';

export const constTaskFormToAddTaskMutationMapper = (
  variables: constTaskType
): CreateConstTaskInput => {
  return {
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
  };
};

export const floatTaskFormToAddTaskMutationMapper = (
  variables: floatTaskType
): CreateFloatTaskInput => {
  return {
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
  };
};

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

const mapPriority = (priority: string): number => {
  switch (priority) {
    case 'low':
      return 1;
    case 'medium':
      return 2;
    case 'high':
      return 3;
    default:
      return 1;
  }
};
