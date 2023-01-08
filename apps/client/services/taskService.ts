import router from 'next/router';
import moment from 'moment';
import {
  ConstTaskInput,
  FloatTaskInput,
  RepeatType,
  Task,
} from '@agh-kiwis/data-access';
import { getIntervalISOString, mapToDateTime } from '@agh-kiwis/moment-service';
import {
  CalendarTileType,
  ConstTaskType,
  FloatTaskType,
} from '@agh-kiwis/types';

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
  start: mapToDateTime(variables.startTime.date, variables.startTime.time),
  deadline: mapToDateTime(variables.deadline.date, variables.deadline.time),
  estimation: getIntervalISOString(variables.timeEstimation),
  chillTime: getIntervalISOString(variables.chillTime),
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
    date: moment(task.chunkInfo.start).format('yyyy-MM-DD'),
    time: moment(task.chunkInfo.start).format('HH:mm'),
  },
  startTimeFacade: '',
  duration: {
    hours: moment.duration(task.chunkInfo.duration).hours(),
    minutes: moment.duration(task.chunkInfo.duration).minutes(),
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
  startTime: {
    date: moment(task.chunkInfo.start).format('yyyy-MM-DD'),
    time: moment(task.chunkInfo.start).format('HH:mm'),
  },
  startTimeFacade: '',
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
  },
  minChunkTimeFacade: '',
  maxChunkTimeFacade: '',
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
  deadline: mapToDateTime(variables.deadline.date, variables.deadline.time),
  estimation: getIntervalISOString(variables.timeEstimation),
  start: mapToDateTime(variables.startTime.date, variables.startTime.time),
  shouldAutoResolve: variables.autoResolve,
  timeBeforeNotification: null,
});

export const mapToCalendarTiles = (tasks: Task[]): CalendarTileType[] => {
  const mappedTasks: CalendarTileType[] = [];

  tasks
    .filter((task) => task.isFloat)
    .map((task) => {
      task.chunks.map((chunk) =>
        mappedTasks.push({
          id: task?.id.toString(),
          title: task?.name,
          start: moment(chunk?.start).toISOString(),
          end: moment(chunk?.start).add(chunk?.duration).toISOString(),
          color: task.category.color.hexCode,
        })
      );
    });

  tasks
    .filter((task) => !task.isFloat)
    .map((task) => {
      mappedTasks.push({
        id: task?.id.toString(),
        title: task?.name,
        start: moment(task?.chunkInfo?.start).toISOString(),
        end: moment(task?.chunkInfo?.start)
          .add(task?.chunkInfo?.duration)
          .toISOString(),
        color: task.category.color.hexCode,
      });
    });

  return mappedTasks;
};

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
    update(cache) {
      cache.evict({ fieldName: 'getTasks' });
    },
  }).catch((error) => {
    // TODO handle error
    console.log(error);
  });

  if (taskResponse) {
    router.push(route);
  }
};

export const handleFloatTaskSubmit = async (
  values: FloatTaskType,
  addFloatTaskMutation,
  route = '/'
) => {
  const taskResponse = await addFloatTaskMutation({
    variables: {
      FloatTaskInput: floatTaskFormToAddTaskMutationMapper(values),
    },
    update(cache) {
      cache.evict({ fieldName: 'getTasks' });
    },
  });

  if (taskResponse) {
    router.push(route);
  }
};
