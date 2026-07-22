import type { DateAdapter } from "../adapters";

export interface DatePickerProps<TDate = Date> {
  value?: TDate | null;
  onChange?: (date: TDate | null) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  format?: string;
  adapter: DateAdapter<TDate>;
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
  /** BCP 47 locale tag used for month/weekday names (e.g. "en-US", "fr-FR"). Defaults to the runtime's default locale. */
  locale?: string;
  /** 0-6, 0 = Sunday. Defaults to 0. */
  firstDayOfWeek?: number;
}

export interface CalendarProps<TDate = Date> {
  value?: TDate | null;
  onChange?: (date: TDate) => void;
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
  adapter: DateAdapter<TDate>;
  className?: string;
  locale?: string;
  firstDayOfWeek?: number;
}

export interface CalendarHeaderProps<TDate = Date> {
  currentDate: TDate;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onMonthClick?: () => void;
  adapter: DateAdapter<TDate>;
  locale?: string;
}
