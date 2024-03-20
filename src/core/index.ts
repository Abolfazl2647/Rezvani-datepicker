import { RezvaniDatepickerAdapter } from "./context";

const maxDaysInPicker = 42;

export function GenerateDatepickerDates(
  adapter: RezvaniDatepickerAdapter<Date>,
  CurrentDate: Date
) {
  const firstDayOfMonth = adapter.startOfMonth(CurrentDate);
  const dayOfWeek = firstDayOfMonth.getDay();
  const prevMonth = adapter.getPreviousMonth(CurrentDate);
  const nextMonth = adapter.getNextMonth(CurrentDate);
  const totalPrevMonth = adapter.getDaysInMonth(prevMonth);
  const totalDays = adapter.getDaysInMonth(CurrentDate);
  const daysInMonth = [];

  // add some days from prev month
  for (let i = totalPrevMonth; i > totalPrevMonth - dayOfWeek; i--) {
    daysInMonth.push(adapter.setDate(prevMonth, i));
  }

  // add some days from current month
  for (let i = 1; i <= totalDays; i++) {
    daysInMonth.push(adapter.setDate(CurrentDate, i));
  }

  // add some days from next month
  if (daysInMonth.length < maxDaysInPicker) {
    const remainDays = maxDaysInPicker - daysInMonth.length;
    for (let i = 1; i <= remainDays; i++) {
      daysInMonth.push(adapter.setDate(nextMonth, i));
    }
  }

  return daysInMonth;
}
