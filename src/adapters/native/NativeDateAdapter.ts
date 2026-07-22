import type { DateAdapter } from "../DateAdapter";

const TOKEN_PATTERN = /YYYY|YY|MM|M|DD|D/g;

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

  today(): Date {
    return new Date();
  }

  isValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
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

  isSameDay(date: Date, value: Date): boolean {
    return (
      date.getFullYear() === value.getFullYear() &&
      date.getMonth() === value.getMonth() &&
      date.getDate() === value.getDate()
    );
  }

  addDays(date: Date, amount: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + amount);
    return result;
  }

  addWeeks(date: Date, amount: number): Date {
    return this.addDays(date, amount * 7);
  }

  addMonths(date: Date, amount: number): Date {
    const result = new Date(date);
    const originalDay = result.getDate();
    result.setDate(1);
    result.setMonth(result.getMonth() + amount);
    const daysInTargetMonth = this.getDaysInMonth(result);
    result.setDate(Math.min(originalDay, daysInTargetMonth));
    return result;
  }

  addYears(date: Date, amount: number): Date {
    const result = new Date(date);
    const originalDay = result.getDate();
    result.setDate(1);
    result.setFullYear(result.getFullYear() + amount);
    const daysInTargetMonth = this.getDaysInMonth(result);
    result.setDate(Math.min(originalDay, daysInTargetMonth));
    return result;
  }

  subtractDays(date: Date, amount: number): Date {
    return this.addDays(date, -amount);
  }

  subtractMonths(date: Date, amount: number): Date {
    return this.addMonths(date, -amount);
  }

  subtractYears(date: Date, amount: number): Date {
    return this.addYears(date, -amount);
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

  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  format(date: Date, formatString: string): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return formatString.replace(TOKEN_PATTERN, (token) => {
      switch (token) {
        case "YYYY":
          return String(year);
        case "YY":
          return String(year).slice(-2);
        case "MM":
          return String(month).padStart(2, "0");
        case "M":
          return String(month);
        case "DD":
          return String(day).padStart(2, "0");
        case "D":
          return String(day);
        default:
          return token;
      }
    });
  }

  /**
   * Basic positional parser for the same numeric token vocabulary supported by `format()`
   * (YYYY/YY/MM/M/DD/D). Not a full ICU-style parser — for locale-aware month/weekday
   * names use the library's Intl-based formatting helpers instead of `parse()`.
   */
  parse(value: string, formatString: string): Date | null {
    const groupOrder: Array<"year" | "month" | "day"> = [];
    let regexSource = "";
    let i = 0;

    while (i < formatString.length) {
      const remaining = formatString.slice(i);
      const match = remaining.match(/^(YYYY|YY|MM|M|DD|D)/);
      if (match) {
        const token = match[1];
        if (token === "YYYY") {
          groupOrder.push("year");
          regexSource += "(\\d{4})";
        } else if (token === "YY") {
          groupOrder.push("year");
          regexSource += "(\\d{2})";
        } else if (token === "MM" || token === "M") {
          groupOrder.push("month");
          regexSource += token === "MM" ? "(\\d{2})" : "(\\d{1,2})";
        } else {
          groupOrder.push("day");
          regexSource += token === "DD" ? "(\\d{2})" : "(\\d{1,2})";
        }
        i += token.length;
      } else {
        regexSource += formatString[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        i += 1;
      }
    }

    const match = value.match(new RegExp(`^${regexSource}$`));
    if (!match) return null;

    let year = new Date().getFullYear();
    let month = 1;
    let day = 1;

    groupOrder.forEach((field, index) => {
      const raw = Number(match[index + 1]);
      if (field === "year") {
        year = raw < 100 ? 2000 + raw : raw;
      } else if (field === "month") {
        month = raw;
      } else {
        day = raw;
      }
    });

    const result = new Date(year, month - 1, day);
    const roundTrips =
      result.getFullYear() === year &&
      result.getMonth() === month - 1 &&
      result.getDate() === day;

    return roundTrips ? result : null;
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

  startOfWeek(date: Date, firstDayOfWeek: number = 0): Date {
    const result = new Date(date);
    const diff = (result.getDay() - firstDayOfWeek + 7) % 7;
    result.setDate(result.getDate() - diff);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  endOfWeek(date: Date, firstDayOfWeek: number = 0): Date {
    const result = this.startOfWeek(date, firstDayOfWeek);
    result.setDate(result.getDate() + 6);
    result.setHours(23, 59, 59, 999);
    return result;
  }
}
