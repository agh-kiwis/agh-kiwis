import moment from 'moment';
import { TaskBreakdown } from '@agh-kiwis/data-access';

export const roundToMinutes = (date: moment.Moment, minutes: number) => {
  const remainder = minutes - (date.minute() % minutes);

  return moment(date).add(remainder, 'minutes').format('HH:mm');
};

export const timeInterval = (breakdown: TaskBreakdown) => {
  const start = startToTime(breakdown.start);
  const end = startToTime(moment(breakdown.start).add(breakdown.duration));
  return start + ' - ' + end;
};

export const deadlineToDate = (deadline: string, dateFormat = 'DD MMM') => {
  return moment(deadline, 'x').format(dateFormat);
};

export const startToTime = (start: moment.Moment) => {
  return moment(start).format('HH:mm');
};

export const startToDate = (start: moment.Moment, dateFormat = 'DD MMM') => {
  return moment(start).format(dateFormat);
};
