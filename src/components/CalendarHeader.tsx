import type { DateAdapter } from "../adapters/DateAdapter";

export interface CalendarHeaderProps<TDate = Date> {
  currentDate: TDate;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthClick?: () => void;
  adapter: DateAdapter<TDate>;
}

export function CalendarHeader<TDate = Date>({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onMonthClick,
  adapter,
}: CalendarHeaderProps<TDate>) {
  const monthYear = adapter.format(currentDate, "MMMM YYYY");

  return (
    <div className="datepicker-header">
      <button
        onClick={onPrevMonth}
        aria-label="Previous month"
        className="datepicker-nav-btn"
      >
        ‹
      </button>
      <button
        onClick={onMonthClick}
        className="datepicker-month-year"
        type="button"
      >
        {monthYear}
      </button>
      <button
        onClick={onNextMonth}
        aria-label="Next month"
        className="datepicker-nav-btn"
      >
        ›
      </button>
    </div>
  );
}
