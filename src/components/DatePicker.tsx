import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
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
  locale,
  firstDayOfWeek,
}: DatePickerProps<TDate>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLInputElement>(null);
  const popupId = useId();

  const closePopup = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleSelect = (date: TDate) => {
    onChange?.(date);
    closePopup();
  };

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation();
    onChange?.(null);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event: Event) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handlePopupKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closePopup();
    }
  };

  const displayValue = value ? adapter.format(value, format) : "";

  return (
    <div className={`datepicker ${className}`} ref={containerRef}>
      <div className="datepicker-input-wrapper">
        <input
          ref={triggerRef}
          type="text"
          value={displayValue}
          readOnly
          autoComplete="off"
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={handleTriggerKeyDown}
          disabled={disabled}
          className="datepicker-input"
          placeholder={placeholder}
          role="combobox"
          aria-haspopup="grid"
          aria-expanded={isOpen}
          aria-controls={popupId}
        />
        {value != null && !disabled && (
          <button
            type="button"
            className="datepicker-clear-btn"
            onClick={handleClear}
            aria-label="Clear date"
          >
            ×
          </button>
        )}
      </div>
      {isOpen && (
        <div
          className="datepicker-popup"
          id={popupId}
          onKeyDown={handlePopupKeyDown}
        >
          <Calendar
            value={value}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
            adapter={adapter}
            locale={locale}
            firstDayOfWeek={firstDayOfWeek}
          />
        </div>
      )}
    </div>
  );
}
