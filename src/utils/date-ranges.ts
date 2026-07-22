import type { DateAdapter } from "../adapters/DateAdapter";

export function getDaysInMonth<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>
): number {
  return adapter.getDaysInMonth(date);
}

export function getFirstDayOfMonth<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>,
  firstDayOfWeek: number = 0
): number {
  const firstDay = adapter.startOfMonth(date);
  return (adapter.getDay(firstDay) - firstDayOfWeek + 7) % 7;
}

/**
 * Boundary-inclusive range check. Uses exact-instant `isEqual` for the boundary
 * comparison; a future `DateRangePicker` (see DateRange.ts) should switch to
 * `isSameDay` so a boundary date selected earlier in the day still counts as
 * "in range" for the rest of that day.
 */
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

/**
 * Returns the visible days for a month view, grouped into weeks (including
 * leading/trailing days from the adjacent months needed to fill each week),
 * rotated to start on `firstDayOfWeek`.
 */
export function getWeeksInMonth<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>,
  firstDayOfWeek: number = 0
): TDate[][] {
  const gridStart = adapter.startOfWeek(adapter.startOfMonth(date), firstDayOfWeek);
  const gridEnd = adapter.endOfWeek(adapter.endOfMonth(date), firstDayOfWeek);

  const weeks: TDate[][] = [];
  let week: TDate[] = [];
  let cursor = gridStart;

  while (!adapter.isAfter(cursor, gridEnd)) {
    week.push(cursor);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    cursor = adapter.addDays(cursor, 1);
  }
  if (week.length > 0) {
    weeks.push(week);
  }

  return weeks;
}

export interface DateDisabledOptions<TDate> {
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
}

/** Single source of truth for "is this date unselectable" — used by CalendarGrid. */
export function isDateDisabled<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>,
  { minDate, maxDate, disabledDates }: DateDisabledOptions<TDate> = {}
): boolean {
  if (minDate && adapter.isBefore(date, minDate)) return true;
  if (maxDate && adapter.isAfter(date, maxDate)) return true;
  if (disabledDates?.some((d) => adapter.isSameDay(d, date))) return true;
  return false;
}
