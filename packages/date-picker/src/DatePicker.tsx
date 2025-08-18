// src/DatePicker.tsx
import React, { ComponentType } from "react";
import { DateAdapter } from "./adapters/DateAdapter";

export interface DatePickerProps<TDate> {
  adapter: DateAdapter<TDate>;
  value: TDate;
  onChange: (date: TDate) => void;
  DayCell?: ComponentType<any>;
}

export function DatePicker<TDate>({
  adapter,
  value,
  onChange,
  DayCell,
}: DatePickerProps<TDate>) {
  return <div>{/* calendar grid */}</div>;
}
