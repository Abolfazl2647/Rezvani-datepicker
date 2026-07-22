import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import type { CalendarProps } from "../types";
import { getWeeksInMonth } from "../utils/date-ranges";
import { useCalendarState } from "../hooks/useCalendarState";

export function Calendar<TDate = Date>({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  adapter,
  className = "",
  locale,
  firstDayOfWeek = 0,
}: CalendarProps<TDate>) {
  const {
    currentDate,
    setCurrentDate,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousYear,
    goToNextYear,
    setToday,
  } = useCalendarState(adapter, value ?? undefined);

  const weeks = getWeeksInMonth(currentDate, adapter, firstDayOfWeek);

  return (
    <div className={`datepicker-calendar ${className}`}>
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onPrevYear={goToPreviousYear}
        onNextYear={goToNextYear}
        onMonthClick={setToday}
        adapter={adapter}
        locale={locale}
      />
      <CalendarGrid
        weeks={weeks}
        onSelectDay={onChange ?? (() => {})}
        onNavigate={setCurrentDate}
        selectedDate={value}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        adapter={adapter}
        currentMonth={currentDate}
        locale={locale}
        firstDayOfWeek={firstDayOfWeek}
      />
    </div>
  );
}
