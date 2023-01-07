const newDate = (
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute = 0
) => {
  const date = new Date(year, month - 1, day, hour, minute);

  // Find how many weeks have passed until now since date
  const daysPassed = Math.floor(
    (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysPassed < 0) {
    return date;
  }

  // Round the days to the closest weeks number
  const weeksPassed = Math.round(daysPassed / 7) + 1;

  date.setTime(date.getTime() + weeksPassed * 7 * 24 * 60 * 60 * 1000);

  return date;
};

export default newDate;
