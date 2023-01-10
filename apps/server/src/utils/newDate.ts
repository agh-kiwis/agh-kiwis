const STARTING_POINT = new Date(2022, 11, 11, 23);

const newDate = (
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute = 0
) => {
  const date = new Date(year, month - 1, day, hour, minute);

  const weeksPassed = Math.floor(
    (new Date().getTime() - STARTING_POINT.getTime()) /
      (1000 * 60 * 60 * 24 * 7)
  );

  date.setTime(date.getTime() + weeksPassed * 7 * 24 * 60 * 60 * 1000);

  return date;
};

export default newDate;
