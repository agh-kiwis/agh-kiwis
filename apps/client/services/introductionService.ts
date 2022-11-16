import moment from 'moment';
import {
  Category,
  CreateConstTaskInput,
  RepeatType,
  UpdateUserInput,
} from '@agh-kiwis/data-access';
import {
  getDurationBetweenTwoDates,
  getIntervalISOString,
  mapToDateTime,
} from '@agh-kiwis/moment-service';
import { SleepPreferencesType, UserDetailsType } from '@agh-kiwis/types';

export const mapUserDetailsToUpdateUserMutation = (
  id: number,
  formData: UserDetailsType
): UpdateUserInput => ({
  id: id,
  name: formData.name,
  birthDate: new Date(formData.birthDate),
  gender: formData.gender,
  introductionCompleted: true,
});

export const mapSleepPreferencesToAddConstTaskMutation = (
  sleepPreferences: SleepPreferencesType,
  category: Category
): CreateConstTaskInput => {
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
      startFrom: mapToDateTime(
        moment().format('yyyy-MM-DD'),
        sleepPreferences.sleep
      ),
      repeatType: RepeatType.Days,
    },
    start: mapToDateTime(moment().format('yyyy-MM-DD'), sleepPreferences.sleep),
    shouldAutoResolve: true,
    timeBeforeNotification: null,
  };
};
