import moment from 'moment';
import { Category } from '@agh-kiwis/data-access';
import {
  ConstTaskType,
  SleepPreferencesType,
  UserDetailsType,
} from '@agh-kiwis/types';

export const initialUserDetails: UserDetailsType = {
  name: '',
  birthDate: '',
  gender: 'male',
};

export const initialSleepPreferences: SleepPreferencesType = {
  sleep: moment({ hour: 23 }).format('HH:mm'),
  wakeUp: moment({ hour: 7 }).format('HH:mm'),
};

export const initialBreakfastPreferences = (
  category: Category
): ConstTaskType => ({
  type: 'const',
  category: {
    id: category.id,
    name: category.name,
    color: category.color.hexCode,
  },
  taskName: 'Breakfast',
  startTime: {
    date: moment().format('yyyy-MM-DD'),
    time: moment({ hours: 7, minutes: 30 }).format('HH:mm'),
  },
  startTimeFacade: '',
  duration: {
    hours: 0,
    minutes: 20,
  },
  durationFacade: '',
  chillTime: {
    minutes: 10,
  },
  chillTimeFacade: '',
  priority: 'low',
  repeat: {
    shouldRepeat: true,
    repeatEvery: {
      type: 'Day',
      amount: 1,
    },
  },
  repeatEveryFacade: '',
  notify: false,
  autoResolve: false,
});

export const initialDinnerPreferences = (
  category: Category
): ConstTaskType => ({
  type: 'const',
  category: {
    id: category.id,
    name: category.name,
    color: category.color.hexCode,
  },
  taskName: 'Dinner',
  startTime: {
    date: moment().format('yyyy-MM-DD'),
    time: moment({ hours: 13, minutes: 30 }).format('HH:mm'),
  },
  startTimeFacade: '',
  duration: {
    hours: 0,
    minutes: 30,
  },
  durationFacade: '',
  chillTime: {
    minutes: 10,
  },
  chillTimeFacade: '',
  priority: 'low',
  repeat: {
    shouldRepeat: true,
    repeatEvery: {
      type: 'Day',
      amount: 1,
    },
  },
  repeatEveryFacade: '',
  notify: false,
  autoResolve: false,
});

export const initialSupperPreferences = (
  category: Category
): ConstTaskType => ({
  type: 'const',
  category: {
    id: category.id,
    name: category.name,
    color: category.color.hexCode,
  },
  taskName: 'Supper',
  startTime: {
    date: moment().format('yyyy-MM-DD'),
    time: moment({ hours: 19, minutes: 30 }).format('HH:mm'),
  },
  startTimeFacade: '',
  duration: {
    hours: 0,
    minutes: 20,
  },
  durationFacade: '',
  chillTime: {
    minutes: 10,
  },
  chillTimeFacade: '',
  priority: 'low',
  repeat: {
    shouldRepeat: true,
    repeatEvery: {
      type: 'Day',
      amount: 1,
    },
  },
  repeatEveryFacade: '',
  notify: false,
  autoResolve: false,
});
