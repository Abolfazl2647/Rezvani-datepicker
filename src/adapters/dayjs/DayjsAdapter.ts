import type dayjs from "dayjs";
import type { DateAdapter } from "../DateAdapter";

export class DayjsAdapter implements DateAdapter<dayjs.Dayjs> {
  constructor(private dayjsLib: typeof dayjs) {}

  date(value?: any): dayjs.Dayjs {
    return this.dayjsLib(value);
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

  addDays(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.add(amount, "day");
  }

  addMonths(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.add(amount, "month");
  }

  addYears(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return date.add(amount, "year");
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

  format(date: dayjs.Dayjs, formatString: string): string {
    return date.format(formatString);
  }

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
}
