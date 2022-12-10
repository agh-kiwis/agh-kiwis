import moment from 'moment';
import { Category, ConstTaskInput, RepeatType } from '@agh-kiwis/data-access';
import {
  getDurationBetweenTwoDates,
  getIntervalISOString,
  mapToDateTime,
} from '@agh-kiwis/moment-service';
import { SleepPreferencesType } from '@agh-kiwis/types';

export const mapSleepPreferencesToAddConstTaskMutation = (
  sleepPreferences: SleepPreferencesType,
  category: Category
): ConstTaskInput => {
  const sleepDuration = getDurationBetweenTwoDates(
    sleepPreferences.sleep,
    sleepPreferences.wakeUp
  );
  return {
    category: {
      id: category.id,
    },
    chillTime: getIntervalISOString({ minutes: 10 }),
    duration: getIntervalISOString({
      hours: sleepDuration.hours(),
      minutes: sleepDuration.minutes(),
    }),
    name: 'Sleep',
    priority: 'medium',
    repeat: {
      repeatEvery: 1,
      repeatType: RepeatType.Days,
    },
    start: mapToDateTime(moment().format('yyyy-MM-DD'), sleepPreferences.sleep),
    shouldAutoResolve: true,
    timeBeforeNotification: null,
  };
};
