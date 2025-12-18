import type { DateAdapter } from "../adapters/DateAdapter";

export interface CalendarGridProps<TDate = Date> {
  days: TDate[];
  onSelectDay: (date: TDate) => void;
  selectedDate?: TDate | null;
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
  adapter: DateAdapter<TDate>;
  currentMonth: TDate;
}

export function CalendarGrid<TDate = Date>({
  days,
  onSelectDay,
  selectedDate,
  minDate,
  maxDate,
  disabledDates,
  adapter,
  currentMonth,
}: CalendarGridProps<TDate>) {
  const isDateDisabled = (date: TDate): boolean => {
    if (minDate && adapter.isBefore(date, minDate)) return true;
    if (maxDate && adapter.isAfter(date, maxDate)) return true;
    if (disabledDates?.some((d) => adapter.isEqual(d, date))) return true;
    return false;
  };

  const isDateInCurrentMonth = (date: TDate): boolean => {
    return adapter.getMonth(date) === adapter.getMonth(currentMonth);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="datepicker-grid">
      <div className="datepicker-weekdays">
        {weekDays.map((day) => (
          <div key={day} className="datepicker-weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="datepicker-days">
        {days.map((day, index) => {
          const disabled = isDateDisabled(day);
          const isCurrentMonth = isDateInCurrentMonth(day);
          const isSelected = selectedDate && adapter.isEqual(day, selectedDate);

          return (
            <button
              key={`${adapter.getYear(day)}-${adapter.getMonth(
                day
              )}-${adapter.getDate(day)}-${index}`}
              onClick={() => !disabled && onSelectDay(day)}
              disabled={disabled}
              className={`datepicker-day ${
                !isCurrentMonth ? "outside-month" : ""
              } ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
              type="button"
            >
              {adapter.getDate(day)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
