import { CreateConstTaskInput, RepeatType } from '@agh-kiwis/data-access';
import moment from 'moment';
import { constTaskType } from '../types/TaskTypes';

export const constTaskFormToAddTaskMutationMapper = (
  variables: constTaskType
): CreateConstTaskInput => {
  console.log(variables);

  return {
    category: {
      id: 1,
    },
    chillTime: getIntervalISOString(variables.chillTime),
    duration: getIntervalISOString(variables.duration),
    name: variables.taskName,
    // TODO replace not to be hardcoded
    priorityId: 1,
    repeat: {
      repeatEvery: variables.repeat.repeatEvery.amount,
      startFrom: mapToDateTime(variables.startTime.date),
      repeatType: mapRepeatType(variables.repeat.repeatEvery.type),
    },
    start: mapToDateTime(variables.startTime.date, variables.startTime.time),
    shouldAutoResolve: false,
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
  if (!time) {
    return new Date(date);
  }

  const splitedTime = time.split(':');
  const dateTime = new Date(date);
  dateTime.setHours(parseInt(splitedTime[0]));
  dateTime.setMinutes(parseInt(splitedTime[1]));

  return dateTime;
};

export const addFloatTask = async (values) => {
  console.log(values);
};
