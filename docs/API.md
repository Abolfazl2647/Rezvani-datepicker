# API Reference

## Components

### DatePicker

Main datepicker component.

```typescript
interface DatePickerProps<TDate = Date> {
  value?: TDate | null;
  onChange?: (date: TDate | null) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  format?: string;
  adapter: DateAdapter<TDate>;
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
  /** BCP 47 locale tag for month/weekday names (e.g. "en-US", "fr-FR"). Defaults to the runtime's default locale. */
  locale?: string;
  /** 0-6, 0 = Sunday. Defaults to 0. */
  firstDayOfWeek?: number;
}
```

Renders a text input that opens a calendar popup. Supports outside-click and
Escape to close, Enter/Space/ArrowDown on the input to open, and a clear (×)
button once a value is set (calls `onChange(null)`).

### Calendar

Standalone calendar component (what `DatePicker` renders inside its popup — also
usable on its own, e.g. for an always-visible calendar).

```typescript
interface CalendarProps<TDate = Date> {
  value?: TDate | null;
  onChange?: (date: TDate) => void;
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
  adapter: DateAdapter<TDate>;
  className?: string;
  locale?: string;
  firstDayOfWeek?: number;
}
```

### CalendarHeader

```typescript
interface CalendarHeaderProps<TDate = Date> {
  currentDate: TDate;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onMonthClick?: () => void; // Calendar wires this to "jump to today"
  adapter: DateAdapter<TDate>;
  locale?: string;
}
```

### CalendarGrid

```typescript
interface CalendarGridProps<TDate = Date> {
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
```

Implements a full ARIA grid pattern (`role="grid"`/`"row"`/`"columnheader"`/`"gridcell"`)
with roving-tabindex keyboard navigation: arrow keys move by day/week, Home/End
jump to the start/end of the week, PageUp/PageDown change month, and
Shift+PageUp/PageDown change year.

## Hooks

### useCalendarState

Hook for managing calendar navigation state (used internally by `Calendar`).

```typescript
function useCalendarState<TDate = Date>(
  adapter: DateAdapter<TDate>,
  initialDate?: TDate
): {
  currentDate: TDate;
  setCurrentDate: (date: TDate) => void;
  view: "day" | "month" | "year";
  setView: (view: "day" | "month" | "year") => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToPreviousYear: () => void;
  goToNextYear: () => void;
  setToday: () => void;
};
```

## Utilities

`getWeeksInMonth`, `getDaysInMonth`, `getFirstDayOfMonth`, `isDateInRange`, and
`isDateDisabled` (`src/utils/date-ranges.ts`) are adapter-generic building blocks
for month-grid layout and disabled-date logic. `getMonthNames`, `getWeekdayNames`,
`formatMonthYear`, and `formatFullDate` (`src/utils/locale.ts`) are the Intl-based,
adapter-agnostic label helpers described in [ADAPTERS.md](ADAPTERS.md).

## Reserved / not yet implemented

`DateRange<TDate>` and `DateRangePickerProps<TDate>` (`src/types/DateRange.ts`)
are exported types reserved for a future `DateRangePicker` (start/end date
selection) component. They are not wired to any component in this version, and
their shape may still change before that feature ships.

## Adapters

See [ADAPTERS.md](ADAPTERS.md) for the full `DateAdapter` interface and
per-adapter documentation.
