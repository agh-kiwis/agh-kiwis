import moment from 'moment';
import { roundToMinutes } from '@agh-kiwis/moment-service';
import { constTaskType, floatTaskType } from '@agh-kiwis/types';
import {
  LongIntervalAmountType,
  LongIntervalSelectType,
  NumberInputType,
} from '@agh-kiwis/ui-components';

export const constTaskInitialValues: constTaskType = {
  type: 'const',
  category: {
    id: 1,
    name: '',
    color: '#0077B6',
  },
  color: '',
  taskName: '',
  startTime: {
    date: moment().format('yyyy-MM-DD'),
    time: roundToMinutes(moment(), 10),
  },
  startTimeFacade: '',
  duration: {
    hours: 0,
    minutes: 15,
  },
  durationFacade: '',
  chillTime: {
    minutes: 5,
  },
  chillTimeFacade: '',
  priority: 'low',
  repeat: {
    shouldRepeat: false,
    startFrom: moment().format('yyyy-MM-DD'),
    repeatEvery: {
      type: 'Day',
      amount: 1,
    },
  },
  repeatEveryFacade: '',
  notify: false,
  autoresolve: false,
};

export const floatTaskInitialValues: floatTaskType = {
  type: 'const',
  category: {
    id: 1,
    name: '',
    color: '#0077B6',
  },
  color: '',
  taskName: '',
  deadline: {
    date: moment().add(7, 'd').format('yyyy-MM-DD'),
    time: roundToMinutes(moment(), 10),
  },
  deadlineFacade: '',
  timeEstimation: {
    hours: 1,
    minutes: 0,
  },
  timeEstimationFacade: '',
  chillTime: {
    minutes: 5,
  },
  chillTimeFacade: '',
  priority: 'low',
  chunking: {
    shouldChunk: false,
    minChunkTime: {
      minutes: 10,
    },
    maxChunkTime: {
      hours: 1,
      minutes: 0,
    },
    minTimeBetweenChunks: {
      hours: 0,
      minutes: 30,
    },
  },
  minChunkTimeFacade: '',
  maxChunkTimeFacade: '',
  minTimeBetweenChunksFacade: '',
  notify: false,
  autoresolve: false,
};

export const durationInputFields: NumberInputType[] = [
  {
    minValue: 0,
    maxValue: 24,
    defaultValue: constTaskInitialValues.duration.hours,
    step: 1,
    label: 'Hours',
    name: 'duration.hours',
  },
  {
    minValue: 0,
    maxValue: 60,
    defaultValue: constTaskInitialValues.duration.minutes,
    step: 5,
    label: 'Minutes',
    name: 'duration.minutes',
  },
];

export const chillTimeInputFields: NumberInputType[] = [
  {
    minValue: 0,
    maxValue: 60,
    defaultValue: 5,
    step: 5,
    label: 'Minutes',
    name: 'chillTime.minutes',
  },
];

export const estimationInputFields: NumberInputType[] = [
  {
    minValue: 0,
    maxValue: 24,
    defaultValue: floatTaskInitialValues.timeEstimation.hours,
    step: 1,
    label: 'Hours',
    name: 'timeEstimation.hours',
  },
  {
    minValue: 0,
    maxValue: 60,
    defaultValue: floatTaskInitialValues.timeEstimation.minutes,
    step: 5,
    label: 'Minutes',
    name: 'timeEstimation.minutes',
  },
];

export const minChunkTimeInputFields: NumberInputType[] = [
  {
    minValue: 0,
    maxValue: 60,
    defaultValue: floatTaskInitialValues.chunking.minChunkTime.minutes,
    step: 5,
    label: 'Minutes',
    name: 'chunking.minChunkTime.minutes',
  },
];

export const maxChunkTimeInputFields: NumberInputType[] = [
  {
    minValue: 0,
    maxValue: 24,
    defaultValue: floatTaskInitialValues.chunking.maxChunkTime.hours,
    step: 1,
    label: 'Hours',
    name: 'chunking.maxChunkTime.hours',
  },
  {
    minValue: 0,
    maxValue: 60,
    defaultValue: floatTaskInitialValues.chunking.maxChunkTime.minutes,
    step: 5,
    label: 'Minutes',
    name: 'chunking.maxChunkTime.minutes',
  },
];

export const minTimeBetweenChunksInputFields: NumberInputType[] = [
  {
    minValue: 0,
    maxValue: 24,
    defaultValue: floatTaskInitialValues.chunking.minTimeBetweenChunks.hours,
    step: 1,
    label: 'Hours',
    name: 'chunking.minTimeBetweenChunks.hours',
  },
  {
    minValue: 0,
    maxValue: 60,
    defaultValue: floatTaskInitialValues.chunking.minTimeBetweenChunks.minutes,
    step: 5,
    label: 'Minutes',
    name: 'chunking.minTimeBetweenChunks.minutes',
  },
];

export const repeatEverySelectField: LongIntervalSelectType = {
  name: 'repeat.repeatEvery.type',
  label: 'Type',
  options: ['Day', 'Week', 'Month', 'Year'],
};

export const repeatEveryAmountFields: LongIntervalAmountType[] = [
  {
    minValue: 1,
    maxValue: 28,
    defaultValue: 1,
    step: 1,
    label: 'Day',
    name: 'repeat.repeatEvery.amount',
  },
  {
    minValue: 1,
    maxValue: 4,
    defaultValue: 1,
    step: 1,
    label: 'Week',
    name: 'repeat.repeatEvery.amount',
  },
  {
    minValue: 1,
    maxValue: 12,
    defaultValue: 1,
    step: 1,
    label: 'Month',
    name: 'repeat.repeatEvery.amount',
  },
  {
    minValue: 1,
    maxValue: 10,
    defaultValue: 1,
    step: 1,
    label: 'Year',
    name: 'repeat.repeatEvery.amount',
  },
];
