import { createContext } from "react";
import { IUtils } from "@date-io/core/IUtils";
import DateFnsAdapter from "@date-io/date-fns";
import { GenerateDatepickerDates } from ".";

interface DatepickerContextProps {
  days: Array<Date>;
  adapter?: RezvaniDatepickerAdapter<Date>;
}

// TODO: Maybe we should add the same constraint.
// @ts-ignore TDate in our codebase does not have the `ExtendableDateType` constraint.
export type RezvaniDatepickerAdapter<TDate> = IUtils<TDate>;

export interface DatepickerContextProvider {
  children: React.ReactNode;
  adapter?: RezvaniDatepickerAdapter<Date>;
}

export const DatePickerContext = createContext<DatepickerContextProps>(
  {} as DatepickerContextProps
);

export default function DatePickerProvider({
  children,
  adapter,
}: DatepickerContextProvider) {
  const date = new Date();
  const days = GenerateDatepickerDates(adapter || new DateFnsAdapter(), date);

  return (
    <DatePickerContext.Provider value={{ days, adapter }}>
      {children}
    </DatePickerContext.Provider>
  );
}
