import { useState, useCallback } from "react";
import type { DateAdapter } from "../adapters/DateAdapter";

export function useCalendarState<TDate = Date>(
  adapter: DateAdapter<TDate>,
  initialDate?: TDate
) {
  const [currentDate, setCurrentDate] = useState<TDate>(
    initialDate || adapter.date()
  );
  const [view, setView] = useState<"day" | "month" | "year">("day");

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate((prev) => adapter.addMonths(prev, -1));
  }, [adapter]);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prev) => adapter.addMonths(prev, 1));
  }, [adapter]);

  const goToPreviousYear = useCallback(() => {
    setCurrentDate((prev) => adapter.addYears(prev, -1));
  }, [adapter]);

  const goToNextYear = useCallback(() => {
    setCurrentDate((prev) => adapter.addYears(prev, 1));
  }, [adapter]);

  const setToday = useCallback(() => {
    setCurrentDate(adapter.date());
  }, [adapter]);

  return {
    currentDate,
    setCurrentDate,
    view,
    setView,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousYear,
    goToNextYear,
    setToday,
  };
}
