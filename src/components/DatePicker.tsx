import { useState } from "react";
import { Calendar } from "./Calendar";
import type { DatePickerProps } from "../types";

export function DatePicker<TDate = Date>({
  value,
  onChange,
  disabled,
  placeholder = "Select a date",
  className = "",
  format = "YYYY-MM-DD",
  adapter,
  minDate,
  maxDate,
  disabledDates,
}: DatePickerProps<TDate>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date: TDate) => {
    onChange?.(date);
    setIsOpen(false);
  };

  const displayValue = value ? adapter.format(value, format) : placeholder;

  return (
    <div className={`datepicker ${className}`}>
      <input
        type="text"
        value={displayValue}
        readOnly
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="datepicker-input"
        placeholder={placeholder}
      />
      {isOpen && (
        <div className="datepicker-popup">
          <Calendar
            value={value}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
            adapter={adapter}
          />
        </div>
      )}
    </div>
  );
}
