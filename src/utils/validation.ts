import type { DateAdapter } from "../adapters/DateAdapter";

export function isValidDate<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>
): boolean {
  return adapter.isValid(date);
}

export function validateDateRange<TDate>(
  start: TDate,
  end: TDate,
  isAfter: (a: TDate, b: TDate) => boolean
): boolean {
  return isAfter(end, start);
}
