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
}
```

### Calendar

Standalone calendar component.

```typescript
interface CalendarProps<TDate = Date> {
  value?: TDate | null;
  onChange?: (date: TDate) => void;
  minDate?: TDate;
  maxDate?: TDate;
  disabledDates?: TDate[];
  adapter: DateAdapter<TDate>;
  className?: string;
}
```

## Hooks

### useDatePicker

Hook for managing datepicker state and logic.

```typescript
function useDatePicker<TDate = Date>(
  adapter: DateAdapter<TDate>,
  onSelect?: (date: TDate) => void
): {
  handleDateSelect: (date: TDate) => void;
  isDateDisabled: (
    date: TDate,
    minDate?: TDate,
    maxDate?: TDate,
    disabledDates?: TDate[]
  ) => boolean;
};
```

### useCalendarState

Hook for managing calendar navigation state.

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

## Adapters

See [ADAPTERS.md](ADAPTERS.md) for detailed adapter documentation.
