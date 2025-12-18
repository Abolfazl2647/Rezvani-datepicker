export interface DateRange<TDate = Date> {
  start: TDate;
  end: TDate;
}

export interface DateRangePickerProps<TDate = Date> {
  value?: DateRange<TDate> | null;
  onChange?: (range: DateRange<TDate> | null) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  format?: string;
  minDate?: TDate;
  maxDate?: TDate;
}
