export const newDate = (date: Date) => {
  //   Set date's month to the previous month
  date.setMonth(date.getMonth() - 1);
  return date;
};
