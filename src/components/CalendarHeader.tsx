import type { CalendarHeaderProps } from "../types";
import { formatMonthYear } from "../utils/locale";

export function CalendarHeader<TDate = Date>({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  onMonthClick,
  adapter,
  locale,
}: CalendarHeaderProps<TDate>) {
  const monthYear = formatMonthYear(currentDate, adapter, locale);

  return (
    <div className="datepicker-header">
      <div className="datepicker-nav-group">
        <button
          type="button"
          onClick={onPrevYear}
          aria-label="Previous year"
          className="datepicker-nav-btn datepicker-nav-btn-year"
        >
          «
        </button>
        <button
          type="button"
          onClick={onPrevMonth}
          aria-label="Previous month"
          className="datepicker-nav-btn"
        >
          ‹
        </button>
      </div>
      <button
        onClick={onMonthClick}
        className="datepicker-month-year"
        type="button"
        aria-label={onMonthClick ? `${monthYear}, jump to today` : monthYear}
      >
        {monthYear}
      </button>
      <div className="datepicker-nav-group">
        <button
          type="button"
          onClick={onNextMonth}
          aria-label="Next month"
          className="datepicker-nav-btn"
        >
          ›
        </button>
        <button
          type="button"
          onClick={onNextYear}
          aria-label="Next year"
          className="datepicker-nav-btn datepicker-nav-btn-year"
        >
          »
        </button>
      </div>
    </div>
  );
}
