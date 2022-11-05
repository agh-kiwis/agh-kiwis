import moment from 'moment';
import { SleepPreferencesType, UserDetailsType } from '@agh-kiwis/types';

export const initialUserDetails: UserDetailsType = {
  name: '',
  birthDate: '',
  gender: '',
};

export const initialSleepPreferences: SleepPreferencesType = {
  sleep: moment({ hour: 23 }).format('HH:mm'),
  wakeUp: moment({ hour: 7 }).format('HH:mm'),
};
