/**
 * @remarks Reserved for a future `DateRangePicker` component. Not implemented or
 * wired to any component in this version — the shape may still change before
 * that feature ships.
 */
export interface DateRange<TDate = Date> {
  start: TDate;
  end: TDate;
}

/** @remarks See {@link DateRange} — reserved for a future `DateRangePicker`, not yet implemented. */
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
