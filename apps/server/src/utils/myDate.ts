export const newDate = (date: Date) => {
  //   Set date's month to the previous month
  date.setMonth(date.getMonth() - 1);
  // Add a week
  date.setDate(date.getDate() + 7);
  return date;
};
