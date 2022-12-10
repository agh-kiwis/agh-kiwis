import moment from 'moment';
import { Chunk } from '@agh-kiwis/data-access';
import { IntervalType } from '@agh-kiwis/types';

export const roundToMinutes = (date: moment.Moment, minutes: number) => {
  const remainder = minutes - (date.minute() % minutes);

  return moment(date).add(remainder, 'minutes').format('HH:mm');
};

export const timeInterval = (chunk: Chunk) => {
  const start = startToTime(chunk?.start);
  const end = startToTime(moment(chunk?.start).add(chunk?.duration));
  return start + ' - ' + end;
};

export const deadlineToDate = (deadline: string, dateFormat = 'DD MMM') => {
  return moment(deadline, 'x').format(dateFormat);
};

export const momentToDate = (m: moment.Moment, dateFormat = 'DD MMM') => {
  return moment(m).format(dateFormat);
};

export const startToTime = (start: moment.Moment) => {
  return moment(start).format('HH:mm');
};

export const getIntervalISOString = (interval: IntervalType): string => {
  return moment.duration(interval).toISOString();
};

export const getDurationBetweenTwoDates = (start: string, end: string) => {
  const splittedStartTime = start.split(':');
  const startTime = new Date();
  startTime.setHours(parseInt(splittedStartTime[0]));
  startTime.setMinutes(parseInt(splittedStartTime[1]));

  const splittedEndTime = end.split(':');
  const endTime = new Date();
  endTime.setHours(parseInt(splittedEndTime[0]));
  endTime.setMinutes(parseInt(splittedEndTime[1]));

  return moment.duration(
    moment({
      hours: endTime.getHours(),
      minutes: endTime.getMinutes(),
    })
      .add(1, 'd')
      .diff(
        moment({
          hours: startTime.getHours(),
          minutes: startTime.getMinutes(),
        })
      )
  );
};

export const mapToDateTime = (date: string, time?: string): Date => {
  if (!time) {
    return new Date(date);
  }

  const splittedTime = time.split(':');
  const dateTime = new Date(date);
  dateTime.setHours(parseInt(splittedTime[0]));
  dateTime.setMinutes(parseInt(splittedTime[1]));

  return dateTime;
};

export const addMinutes = (date = new Date(), numOfMinutes: number): Date => {
  date.setMinutes(date.getMinutes() + numOfMinutes);
  return date;
};
