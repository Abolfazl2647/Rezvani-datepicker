import type { DateAdapter } from "../adapters/DateAdapter";

export interface DatePickerConfig<TDate = Date> {
  adapter: DateAdapter<TDate>;
  locale?: string;
  format?: string;
  firstDayOfWeek?: 0 | 1; // 0 = Sunday, 1 = Monday
}
