import { useState, createContext, useMemo } from "react";
import { IUtils } from "@date-io/core/IUtils";
import GenerateDays from "./generateDays";

export type Delimiter = "/" | "-";

interface DatepickerProviderProps {
  children: React.ReactNode;
  dateFormat: string;
  delimiter: Delimiter;
  datepickerAdapter: new (...args: any) => IUtils<Date>;
}

interface DatepickerContextProps {
  dateAdapter: IUtils<Date>;
  days: Array<Date>;
  date: Date;
  mask: string;
  delimiter: string;
  dateFormat: string;
  nextMonth: () => void;
  prevMonth: () => void;
}

export const DatepickerContext = createContext({} as DatepickerContextProps);

export function parseMask(string: string, delimiter: Delimiter = "/"): string {
  const array = string.split(delimiter);
  const newArray = array.map((part) => {
    const newString = part.replace(/[mMyYdD]/g, "_");
    return newString;
  });
  return newArray.join(delimiter);
}

export function DatepickerProvider({
  children,
  datepickerAdapter,
  dateFormat,
  delimiter,
}: DatepickerProviderProps) {
  const [date, setDate] = useState(new Date());

  const dateAdapter = new datepickerAdapter();
  console.log("dateAdapter", dateAdapter);
  const days = useMemo(() => {
    return GenerateDays(dateAdapter, date);
  }, [date]);

  const nextMonth = () => {
    const nextMonth = dateAdapter.addMonths(date, 1);
    setDate(nextMonth);
  };

  const prevMonth = () => {
    const month = dateAdapter.getMonth(date) - 1;
    const prevMonth = dateAdapter.setMonth(date, month);
    setDate(prevMonth);
  };

  const mask = parseMask(dateFormat, delimiter);

  return (
    <DatepickerContext.Provider
      value={{
        days,
        date,
        dateAdapter,
        dateFormat,
        mask,
        delimiter,
        nextMonth,
        prevMonth,
      }}
    >
      {children}
    </DatepickerContext.Provider>
  );
}
