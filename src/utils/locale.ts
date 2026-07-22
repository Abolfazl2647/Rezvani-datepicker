import type { DateAdapter } from "../adapters/DateAdapter";

/**
 * Locale-aware month/weekday name + label helpers built on `Intl.DateTimeFormat`.
 *
 * These are fed a scratch native `Date` built purely from `adapter.getYear/getMonth/getDate`
 * (numbers), never the adapter's own `TDate` value — so they behave identically regardless
 * of which adapter is in use, sidestepping the format-token-dialect mismatch between
 * native/dayjs/date-fns (`adapter.format`/`adapter.parse` remain adapter-specific and are
 * meant for consumer-facing display, not internal UI labels).
 */

function referenceDate(year: number, month1Indexed: number, day: number): Date {
  return new Date(year, month1Indexed - 1, day);
}

export function getMonthNames(
  locale?: string,
  style: "long" | "short" = "long"
): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { month: style });
  return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2000, i, 1)));
}

export function getWeekdayNames(
  locale?: string,
  style: "long" | "short" | "narrow" = "short",
  firstDayOfWeek: number = 0
): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: style });
  // 2023-01-01 was a Sunday, so day index i (0-6) maps directly to getDay()'s convention.
  const names = Array.from({ length: 7 }, (_, i) =>
    formatter.format(new Date(2023, 0, 1 + i))
  );
  return [...names.slice(firstDayOfWeek), ...names.slice(0, firstDayOfWeek)];
}

export function formatMonthYear<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>,
  locale?: string
): string {
  const ref = referenceDate(adapter.getYear(date), adapter.getMonth(date), 1);
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(ref);
}

/** Full formatted date for a single day cell's `aria-label` (e.g. "January 15, 2026"). */
export function formatFullDate<TDate>(
  date: TDate,
  adapter: DateAdapter<TDate>,
  locale?: string
): string {
  const ref = referenceDate(
    adapter.getYear(date),
    adapter.getMonth(date),
    adapter.getDate(date)
  );
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(ref);
}
