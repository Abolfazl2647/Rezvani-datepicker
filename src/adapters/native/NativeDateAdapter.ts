import type { DateAdapter } from "../DateAdapter";

export class NativeDateAdapter implements DateAdapter<Date> {
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
    return date.getTime() < value.getTime();
  }

  isAfter(date: Date, value: Date): boolean {
    return date.getTime() > value.getTime();
  }

  isEqual(date: Date, value: Date): boolean {
    return date.getTime() === value.getTime();
  }

  addDays(date: Date, amount: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + amount);
    return result;
  }

  addMonths(date: Date, amount: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + amount);
    return result;
  }

  addYears(date: Date, amount: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + amount);
    return result;
  }

  getYear(date: Date): number {
    return date.getFullYear();
  }

  getMonth(date: Date): number {
    return date.getMonth() + 1; // 1-indexed
  }

  getDate(date: Date): number {
    return date.getDate();
  }

  getDay(date: Date): number {
    return date.getDay(); // 0 = Sunday
  }

  format(date: Date, formatString: string): string {
    // Simple format implementation
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return formatString
      .replace("YYYY", String(year))
      .replace("MM", month)
      .replace("DD", day);
  }

  parse(value: string, _formatString: string): Date | null {
    try {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  }

  startOfMonth(date: Date): Date {
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  endOfMonth(date: Date): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1);
    result.setDate(0);
    result.setHours(23, 59, 59, 999);
    return result;
  }
}
