import type { DateAdapter } from "../adapters/DateAdapter";

export function getDaysInMonth<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>
): number {
  const nextMonth = adapter.addMonths(date, 1);
  const lastDay = adapter.addDays(adapter.startOfMonth(nextMonth), -1);
  return adapter.getDate(lastDay);
}

export function getFirstDayOfMonth<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>
): number {
  const firstDay = adapter.startOfMonth(date);
  return adapter.getDay(firstDay);
}

export function isDateInRange<TDate>(
  date: TDate,
  start: TDate,
  end: TDate,
  adapter: DateAdapter<TDate>
): boolean {
  return (
    (adapter.isAfter(date, start) || adapter.isEqual(date, start)) &&
    (adapter.isBefore(date, end) || adapter.isEqual(date, end))
  );
}

export function getWeeksInMonth<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>
): TDate[][] {
  const daysInMonth = getDaysInMonth(date, adapter);
  const firstDay = getFirstDayOfMonth(date, adapter);
  const weeks: TDate[][] = [];
  let week: TDate[] = [];

  // Add previous month's days
  const prevMonth = adapter.addMonths(date, -1);
  const daysInPrevMonth = getDaysInMonth(prevMonth, adapter);
  for (let i = daysInPrevMonth - firstDay + 1; i <= daysInPrevMonth; i++) {
    week.push(adapter.addDays(adapter.startOfMonth(prevMonth), i - 1));
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    week.push(adapter.addDays(adapter.startOfMonth(date), i - 1));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  // Add next month's days
  const nextMonth = adapter.addMonths(date, 1);
  let dayCount = 1;
  while (week.length < 7) {
    week.push(adapter.addDays(adapter.startOfMonth(nextMonth), dayCount - 1));
    dayCount++;
  }
  weeks.push(week);

  return weeks;
}
