export interface DateAdapter<TDate = any> {
  date(value?: any): TDate;
  today(): TDate;
  isValid(date: TDate): boolean;
  /** Exact-instant equality. For "same calendar day" comparisons (selection, disabled-date checks) use `isSameDay` instead. */
  isEqual(date: TDate, value: TDate): boolean;
  isSameDay(date: TDate, value: TDate): boolean;
  isBefore(date: TDate, value: TDate): boolean;
  isAfter(date: TDate, value: TDate): boolean;
  addDays(date: TDate, amount: number): TDate;
  addWeeks(date: TDate, amount: number): TDate;
  addMonths(date: TDate, amount: number): TDate;
  addYears(date: TDate, amount: number): TDate;
  subtractDays(date: TDate, amount: number): TDate;
  subtractMonths(date: TDate, amount: number): TDate;
  subtractYears(date: TDate, amount: number): TDate;
  getYear(date: TDate): number;
  /** 1-indexed (1 = January). */
  getMonth(date: TDate): number;
  getDate(date: TDate): number;
  /** 0 = Sunday, per JS convention. */
  getDay(date: TDate): number;
  getDaysInMonth(date: TDate): number;
  /** Format tokens are adapter-specific — see docs/ADAPTERS.md for each adapter's dialect. */
  format(date: TDate, formatString: string): string;
  parse(value: string, formatString: string): TDate | null;
  startOfMonth(date: TDate): TDate;
  endOfMonth(date: TDate): TDate;
  /** @param firstDayOfWeek 0-6, 0 = Sunday. Defaults to 0 if omitted. */
  startOfWeek(date: TDate, firstDayOfWeek?: number): TDate;
  endOfWeek(date: TDate, firstDayOfWeek?: number): TDate;
}
