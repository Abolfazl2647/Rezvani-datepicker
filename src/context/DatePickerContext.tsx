import React, { createContext } from "react";
import type { DateAdapter } from "../adapters/DateAdapter";

interface DatePickerContextType<TDate = Date> {
  adapter: DateAdapter<TDate>;
  locale?: string;
  format?: string;
}

export const DatePickerContext = createContext<
  DatePickerContextType | undefined
>(undefined);

export function useDatePickerContext<
  TDate = Date
>(): DatePickerContextType<TDate> {
  const context = React.useContext(DatePickerContext);
  if (!context) {
    throw new Error(
      "useDatePickerContext must be used within DatePickerProvider"
    );
  }
  return context as DatePickerContextType<TDate>;
}
