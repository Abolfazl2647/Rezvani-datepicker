import { useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import type { DateAdapter } from "../adapters/DateAdapter";
import { getDaysInMonth, getFirstDayOfMonth } from "../utils/date-ranges";

export interface CalendarProps<TDate = Date> {
  value?: TDate | null;
  onChange?: (date: TDate) => void;
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
  adapter: DateAdapter<TDate>;
  className?: string;
}

export function Calendar<TDate = Date>({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  adapter,
  className = "",
}: CalendarProps<TDate>) {
  const [currentDate, setCurrentDate] = useState<TDate>(
    value || adapter.date()
  );

  const handlePrevMonth = () => {
    setCurrentDate((prev) => adapter.addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => adapter.addMonths(prev, 1));
  };

  const handleDateSelect = (date: TDate) => {
    onChange?.(date);
  };

  // Generate days for calendar
  const daysInMonth = getDaysInMonth(currentDate, adapter);
  const firstDay = getFirstDayOfMonth(currentDate, adapter);
  const days: TDate[] = [];

  // Add previous month's days
  const prevMonth = adapter.addMonths(currentDate, -1);
  const daysInPrevMonth = getDaysInMonth(prevMonth, adapter);
  for (let i = daysInPrevMonth - firstDay + 1; i <= daysInPrevMonth; i++) {
    days.push(adapter.addDays(adapter.startOfMonth(prevMonth), i - 1));
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(adapter.addDays(adapter.startOfMonth(currentDate), i - 1));
  }

  // Add next month's days
  const remaining = 42 - days.length; // 6 weeks * 7 days
  for (let i = 1; i <= remaining; i++) {
    days.push(
      adapter.addDays(
        adapter.startOfMonth(adapter.addMonths(currentDate, 1)),
        i - 1
      )
    );
  }

  return (
    <div className={`datepicker-calendar ${className}`}>
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        adapter={adapter}
      />
      <CalendarGrid
        days={days}
        onSelectDay={handleDateSelect}
        selectedDate={value}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        adapter={adapter}
        currentMonth={currentDate}
      />
    </div>
  );
}
