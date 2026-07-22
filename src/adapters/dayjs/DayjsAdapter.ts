import type dayjs from "dayjs";
import type { DateAdapter } from "../DateAdapter";

export class DayjsAdapter implements DateAdapter<dayjs.Dayjs> {
  constructor(private dayjsLib: typeof dayjs) {}

  date(value?: any): dayjs.Dayjs {
    return this.dayjsLib(value);
  }

  today(): dayjs.Dayjs {
    return this.dayjsLib();
  }

  isValid(date: dayjs.Dayjs): boolean {
    return date.isValid();
  }

  isBefore(date: dayjs.Dayjs, value: dayjs.Dayjs): boolean {
    return date.isBefore(value);
  }

  isAfter(date: dayjs.Dayjs, value: dayjs.Dayjs): boolean {
    return date.isAfter(value);
  }

  isEqual(date: dayjs.Dayjs, value: dayjs.Dayjs): boolean {
    return date.isSame(value);
  }

  isSameDay(date: dayjs.Dayjs, value: dayjs.Dayjs): boolean {
    return date.isSame(value, "day");
  }

  addDays(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.add(amount, "day");
  }

  addWeeks(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.add(amount, "week");
  }

  addMonths(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.add(amount, "month");
  }

  addYears(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.add(amount, "year");
  }

  subtractDays(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.subtract(amount, "day");
  }

  subtractMonths(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.subtract(amount, "month");
  }

  subtractYears(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.subtract(amount, "year");
  }

  getYear(date: dayjs.Dayjs): number {
    return date.year();
  }

  getMonth(date: dayjs.Dayjs): number {
    return date.month() + 1; // 1-indexed
  }

  getDate(date: dayjs.Dayjs): number {
    return date.date();
  }

  getDay(date: dayjs.Dayjs): number {
    return date.day();
  }

  getDaysInMonth(date: dayjs.Dayjs): number {
    return date.daysInMonth();
  }

  format(date: dayjs.Dayjs, formatString: string): string {
    return date.format(formatString);
  }

  /**
   * Requires the consumer's dayjs instance to have the `customParseFormat` plugin
   * `.extend()`-ed, or `formatString` is silently ignored and dayjs falls back to
   * loose parsing of `value`. See docs/ADAPTERS.md.
   */
  parse(value: string, formatString: string): dayjs.Dayjs | null {
    const parsed = this.dayjsLib(value, formatString);
    return parsed.isValid() ? parsed : null;
  }

  startOfMonth(date: dayjs.Dayjs): dayjs.Dayjs {
    return date.startOf("month");
  }

  endOfMonth(date: dayjs.Dayjs): dayjs.Dayjs {
    return date.endOf("month");
  }

  startOfWeek(date: dayjs.Dayjs, firstDayOfWeek: number = 0): dayjs.Dayjs {
    const diff = (date.day() - firstDayOfWeek + 7) % 7;
    return date.subtract(diff, "day").startOf("day");
  }

  endOfWeek(date: dayjs.Dayjs, firstDayOfWeek: number = 0): dayjs.Dayjs {
    return this.startOfWeek(date, firstDayOfWeek).add(6, "day").endOf("day");
  }
}
