import moment from 'moment';
import { roundToMinutes } from '@agh-kiwis/moment-service';
import { ConstTaskType, FloatTaskType } from '@agh-kiwis/types';
import {
  LongIntervalAmountType,
  LongIntervalSelectType,
  NumberInputType,
} from '@agh-kiwis/ui-components';

export const constTaskInitialValues: ConstTaskType = {
  type: 'const',
  category: {
    id: 1,
    name: 'Choose your category',
    color: '#a2a2a2',
  },
  taskName: '',
  startTime: {
    date: moment().format('yyyy-MM-DD'),
    time: roundToMinutes(moment().add(10, 'minutes'), 10),
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
    repeatEvery: {
      type: 'Day',
      amount: 1,
    },
    repeatUntil: moment().add(1, 'y').format('yyyy-MM-DD'),
  },
  repeatEveryFacade: '',
  notify: false,
  autoResolve: false,
};

export const floatTaskInitialValues: FloatTaskType = {
  type: 'float',
  category: {
    id: 1,
    name: 'Choose your category',
    color: '#a2a2a2',
  },
  taskName: '',
  startTime: {
    date: moment().format('yyyy-MM-DD'),
    time: roundToMinutes(moment().add(10, 'minutes'), 10),
  },
  startTimeFacade: '',
  deadline: {
    date: moment().add(7, 'd').format('yyyy-MM-DD'),
    time: roundToMinutes(moment().add(10, 'minutes'), 10),
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
    shouldChunk: true,
    minChunkTime: {
      minutes: 10,
    },
    maxChunkTime: {
      hours: 1,
      minutes: 0,
    },
  },
  minChunkTimeFacade: '',
  maxChunkTimeFacade: '',
  notify: false,
  autoResolve: false,
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
