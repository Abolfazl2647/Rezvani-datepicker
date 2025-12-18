export interface DateAdapter<TDate = any> {
  date(value?: any): TDate;
  isBefore(date: TDate, value: TDate): boolean;
  isAfter(date: TDate, value: TDate): boolean;
  isEqual(date: TDate, value: TDate): boolean;
  addDays(date: TDate, amount: number): TDate;
  addMonths(date: TDate, amount: number): TDate;
  addYears(date: TDate, amount: number): TDate;
  getYear(date: TDate): number;
  getMonth(date: TDate): number;
  getDate(date: TDate): number;
  getDay(date: TDate): number;
  format(date: TDate, formatString: string): string;
  parse(value: string, formatString: string): TDate | null;
  startOfMonth(date: TDate): TDate;
  endOfMonth(date: TDate): TDate;
}
