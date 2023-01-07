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

  if (weeksPassed <= 0) {
    // Just add a week
    date.setTime(date.getTime() + 1 * 7 * 24 * 60 * 60 * 1000);
  } else {
    date.setTime(date.getTime() + (weeksPassed + 1) * 7 * 24 * 60 * 60 * 1000);
  }

  // Add a year to the date
  // const date = new Date(year + 1, month - 1, day, hour, minute);

  return date;
};

export default newDate;
