import type { DateAdapter } from "../DateAdapter";
import {
  isBefore,
  isAfter,
  isSameDay,
  addDays,
  addMonths,
  addYears,
  getYear,
  getMonth,
  getDate,
  getDay,
  format,
  parse,
  startOfMonth,
  endOfMonth,
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

  isBefore(date: Date, value: Date): boolean {
    return isBefore(date, value);
  }

  isAfter(date: Date, value: Date): boolean {
    return isAfter(date, value);
  }

  isEqual(date: Date, value: Date): boolean {
    return isSameDay(date, value);
  }

  addDays(date: Date, amount: number): Date {
    return addDays(date, amount);
  }

  addMonths(date: Date, amount: number): Date {
    return addMonths(date, amount);
  }

  addYears(date: Date, amount: number): Date {
    return addYears(date, amount);
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

  format(date: Date, formatString: string): string {
    return format(date, formatString);
  }

  parse(value: string, formatString: string): Date | null {
    try {
      const parsed = parse(value, formatString, new Date());
      return isNaN(parsed.getTime()) ? null : parsed;
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
}
