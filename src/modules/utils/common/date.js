/**
 * Get the last day of the month for the current date or a specified date.
 *
 * @param {Date} [date=new Date()] - The date to get the last day of the month for. Defaults to the current date.
 * @returns {string} The formatted date as "DD/MONTH".
 */
export const getLastDayOfMonth = (date = new Date()) => {
  // Check if the provided date is valid
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date provided.");
  }

  // Create a date object for the first day of the next month
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  // The last day of the current month is the day before the first day of the next month
  const lastDay = new Date(nextMonth - 1);

  // Format the date as "DD/MONTH" where MONTH is in uppercase
  return `${lastDay.getDate()}/${lastDay.toLocaleString("en-US", {
    month: "short",
  })}`;
};
