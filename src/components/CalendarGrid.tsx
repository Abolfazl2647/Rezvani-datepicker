import { useEffect, useMemo, useRef, useState } from "react";
import type { DateAdapter } from "../adapters/DateAdapter";
import { isDateDisabled } from "../utils/date-ranges";
import { formatFullDate, getWeekdayNames } from "../utils/locale";

export interface CalendarGridProps<TDate = Date> {
  /** Visible days grouped into weeks (see `getWeeksInMonth`), already rotated to `firstDayOfWeek`. */
  weeks: TDate[][];
  onSelectDay: (date: TDate) => void;
  /** Called when keyboard navigation moves focus to a date outside the currently visible month. */
  onNavigate: (date: TDate) => void;
  selectedDate?: TDate | null;
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
  adapter: DateAdapter<TDate>;
  currentMonth: TDate;
  locale?: string;
  firstDayOfWeek?: number;
}

function dateKey<TDate>(date: TDate, adapter: DateAdapter<TDate>): string {
  return `${adapter.getYear(date)}-${adapter.getMonth(date)}-${adapter.getDate(date)}`;
}

export function CalendarGrid<TDate = Date>({
  weeks,
  onSelectDay,
  onNavigate,
  selectedDate,
  minDate,
  maxDate,
  disabledDates,
  adapter,
  currentMonth,
  locale,
  firstDayOfWeek = 0,
}: CalendarGridProps<TDate>) {
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const monthKey = `${adapter.getYear(currentMonth)}-${adapter.getMonth(currentMonth)}`;

  const [focusedKey, setFocusedKey] = useState<string>(() =>
    dateKey(currentMonth, adapter)
  );

  const isDateInCurrentMonth = (date: TDate): boolean =>
    adapter.getYear(date) === adapter.getYear(currentMonth) &&
    adapter.getMonth(date) === adapter.getMonth(currentMonth);

  // Whenever the visible month changes, move the roving tabindex to the
  // selected date (if visible), else today (if visible), else the 1st.
  useEffect(() => {
    const flat = weeks.flat();
    let next: TDate | undefined;
    if (selectedDate && flat.some((d) => adapter.isSameDay(d, selectedDate))) {
      next = selectedDate;
    } else {
      const today = adapter.today();
      if (flat.some((d) => adapter.isSameDay(d, today))) {
        next = today;
      }
    }
    if (!next) next = adapter.startOfMonth(currentMonth);
    setFocusedKey(dateKey(next, adapter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthKey]);

  // Focus follows the roving tabindex once its target button exists in the DOM.
  useEffect(() => {
    buttonRefs.current.get(focusedKey)?.focus();
  }, [focusedKey]);

  const weekdayNames = useMemo(
    () => getWeekdayNames(locale, "short", firstDayOfWeek),
    [locale, firstDayOfWeek]
  );

  const handleKeyDown = (event: React.KeyboardEvent, day: TDate) => {
    let target: TDate | null = null;

    switch (event.key) {
      case "ArrowLeft":
        target = adapter.subtractDays(day, 1);
        break;
      case "ArrowRight":
        target = adapter.addDays(day, 1);
        break;
      case "ArrowUp":
        target = adapter.subtractDays(day, 7);
        break;
      case "ArrowDown":
        target = adapter.addDays(day, 7);
        break;
      case "Home":
        target = adapter.startOfWeek(day, firstDayOfWeek);
        break;
      case "End":
        target = adapter.endOfWeek(day, firstDayOfWeek);
        break;
      case "PageUp":
        target = event.shiftKey
          ? adapter.subtractYears(day, 1)
          : adapter.subtractMonths(day, 1);
        break;
      case "PageDown":
        target = event.shiftKey
          ? adapter.addYears(day, 1)
          : adapter.addMonths(day, 1);
        break;
      default:
        return;
    }

    event.preventDefault();
    setFocusedKey(dateKey(target, adapter));
    if (!isDateInCurrentMonth(target)) {
      onNavigate(target);
    }
  };

  return (
    <div className="datepicker-grid" role="grid">
      <div className="datepicker-weekdays" role="row">
        {weekdayNames.map((name) => (
          <div key={name} className="datepicker-weekday" role="columnheader">
            {name}
          </div>
        ))}
      </div>
      <div className="datepicker-days" role="rowgroup">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="datepicker-week" role="row">
            {week.map((day) => {
              const disabled = isDateDisabled(day, adapter, {
                minDate,
                maxDate,
                disabledDates,
              });
              const isCurrentMonth = isDateInCurrentMonth(day);
              const isSelected = !!selectedDate && adapter.isSameDay(day, selectedDate);
              const isToday = adapter.isSameDay(day, adapter.today());
              const key = dateKey(day, adapter);

              return (
                <div key={key} className="datepicker-gridcell" role="gridcell" aria-selected={isSelected}>
                  <button
                    ref={(el) => {
                      if (el) buttonRefs.current.set(key, el);
                      else buttonRefs.current.delete(key);
                    }}
                    onClick={() => !disabled && onSelectDay(day)}
                    onKeyDown={(e) => handleKeyDown(e, day)}
                    disabled={disabled}
                    tabIndex={key === focusedKey ? 0 : -1}
                    aria-current={isToday ? "date" : undefined}
                    aria-label={formatFullDate(day, adapter, locale)}
                    className={`datepicker-day ${
                      !isCurrentMonth ? "outside-month" : ""
                    } ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""} ${
                      isToday ? "today" : ""
                    }`}
                    type="button"
                  >
                    {adapter.getDate(day)}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
