import { useCallback } from "react";
import type { DateAdapter } from "../adapters/DateAdapter";

export function useDatePicker<TDate = Date>(
  adapter: DateAdapter<TDate>,
  onSelect?: (date: TDate) => void
) {
  const handleDateSelect = useCallback(
    (date: TDate) => {
      onSelect?.(date);
    },
    [onSelect]
  );

  const isDateDisabled = useCallback(
    (
      date: TDate,
      minDate?: TDate,
      maxDate?: TDate,
      disabledDates?: TDate[]
    ): boolean => {
      if (minDate && adapter.isBefore(date, minDate)) {
        return true;
      }
      if (maxDate && adapter.isAfter(date, maxDate)) {
        return true;
      }
      if (disabledDates?.some((d) => adapter.isEqual(d, date))) {
        return true;
      }
      return false;
    },
    [adapter]
  );

  return {
    handleDateSelect,
    isDateDisabled,
  };
}
