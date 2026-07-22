import type { DateAdapter } from "../DateAdapter";
import {
  isBefore,
  isAfter,
  isEqual as isEqualExact,
  isSameDay,
  isValid,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  subDays,
  subMonths,
  subYears,
  getYear,
  getMonth,
  getDate,
  getDay,
  getDaysInMonth,
  format,
  parse,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";

export class DateFnsAdapter implements DateAdapter<Date> {
  date(value?: any): Date {
    if (value instanceof Date) {
      return new Date(value);
    }
    if (value == null) {
      return new Date();
    }
    return new Date(value);
  }

  today(): Date {
    return new Date();
  }

  isValid(date: Date): boolean {
    return isValid(date);
  }

  isBefore(date: Date, value: Date): boolean {
    return isBefore(date, value);
  }

  isAfter(date: Date, value: Date): boolean {
    return isAfter(date, value);
  }

  isEqual(date: Date, value: Date): boolean {
    return isEqualExact(date, value);
  }

  isSameDay(date: Date, value: Date): boolean {
    return isSameDay(date, value);
  }

  addDays(date: Date, amount: number): Date {
    return addDays(date, amount);
  }

  addWeeks(date: Date, amount: number): Date {
    return addWeeks(date, amount);
  }

  addMonths(date: Date, amount: number): Date {
    return addMonths(date, amount);
  }

  addYears(date: Date, amount: number): Date {
    return addYears(date, amount);
  }

  subtractDays(date: Date, amount: number): Date {
    return subDays(date, amount);
  }

  subtractMonths(date: Date, amount: number): Date {
    return subMonths(date, amount);
  }

  subtractYears(date: Date, amount: number): Date {
    return subYears(date, amount);
  }

  getYear(date: Date): number {
    return getYear(date);
  }

  getMonth(date: Date): number {
    return getMonth(date) + 1; // 1-indexed
  }

  getDate(date: Date): number {
    return getDate(date);
  }

  getDay(date: Date): number {
    return getDay(date);
  }

  getDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  /** Uses date-fns's own (lowercase) token vocabulary — see docs/ADAPTERS.md. */
  format(date: Date, formatString: string): string {
    return format(date, formatString);
  }

  parse(value: string, formatString: string): Date | null {
    try {
      const parsed = parse(value, formatString, new Date());
      return isValid(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  startOfMonth(date: Date): Date {
    return startOfMonth(date);
  }

  endOfMonth(date: Date): Date {
    return endOfMonth(date);
  }

  startOfWeek(date: Date, firstDayOfWeek: number = 0): Date {
    return startOfWeek(date, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  }

  endOfWeek(date: Date, firstDayOfWeek: number = 0): Date {
    return endOfWeek(date, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  }
}
