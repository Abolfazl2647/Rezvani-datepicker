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
}

export interface CalendarProps<TDate = Date> {
  value?: TDate | null;
  onChange?: (date: TDate) => void;
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
  adapter: DateAdapter<TDate>;
}

export interface CalendarHeaderProps<TDate = Date> {
  currentDate: TDate;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthClick?: () => void;
  adapter: DateAdapter<TDate>;
}
