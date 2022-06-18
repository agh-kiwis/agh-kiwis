import moment from 'moment';
import {
  LongIntervalAmountType,
  LongIntervalSelectType,
} from '../../components/Pickers/LongIntervalPicker';
import { NumberInputType } from '../../components/Pickers/IntervalPicker';
import { constTaskType } from '../../components/Tasks/ConstTaskForm';
import { floatTaskType } from '../../components/Tasks/FloatTaskForm';
import { roundToMinutes } from '../../components/Utils/MomentUtils';

export const constTaskInitialValues: constTaskType = {
  type: 'const',
  category: {
    color: '#38A169',
    name: '',
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
  priority: '',
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
    color: '#38A169',
    name: '',
  },
  color: '',
  taskName: '',
  deadline: {
    date: moment().add(7, 'd').format('yyyy-MM-DD'),
    time: roundToMinutes(moment(), 10),
  },
  deadlineFacade: '',
  timeEstimation: {
    hours: 0,
    minutes: 15,
  },
  timeEstimationFacade: '',
  chillTime: {
    minutes: 5,
  },
  chillTimeFacade: '',
  priority: '',
  chunking: {
    shouldChunk: false,
    numberOfChunks: 1,
    repeatEvery: {
      type: 'Day',
      amount: 1,
    },
  },
  repeatEveryFacade: '',
  notify: false,
  autoresolve: false,
};

export const durationInputFields: NumberInputType[] = [
  {
    minValue: 0,
    maxValue: 24,
    defaultValue: 0,
    step: 1,
    label: 'Hours',
    name: 'duration.hours',
  },
  {
    minValue: 0,
    maxValue: 60,
    defaultValue: 15,
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

export const repeatEverySelectField: LongIntervalSelectType = {
  name: 'repeat.repeatEvery.type',
  label: 'Type',
  options: ['Day', 'Week', 'Month'],
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
];
