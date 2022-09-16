import moment from 'moment';

export const timeInterval = (breakdown: any) => {
  const start = startToTime(breakdown.start);
  const end = startToTime(moment(breakdown.start).add(breakdown.duration));
  return start + ' - ' + end;
};

export const deadlineToDate = (deadline: number) => {
  return moment(deadline, 'x').format('DD MMM');
};

export const startToTime = (start: moment.Moment) => {
  return moment(start).format('HH:mm');
};

export const startToDate = (start: moment.Moment) => {
  return moment(start).format('DD MMM');
};