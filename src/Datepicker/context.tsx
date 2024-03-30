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
  timeLine: Date[];
  delimiter: string;
  dateFormat: string;
  nextMonth: () => void;
  prevMonth: () => void;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
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

const maxYears = 70;
export function DatepickerProvider({
  children,
  datepickerAdapter,
  dateFormat,
  delimiter,
}: DatepickerProviderProps) {
  const [date, setDate] = useState(new Date());

  const dateAdapter = new datepickerAdapter();
  // console.log("dateAdapter", dateAdapter);
  const { addYears, addMonths, getMonth, setMonth } = dateAdapter;

  const timeLine = useMemo(() => {
    const timeline = [];
    for (let i = 0; i < maxYears; i++) {
      timeline.push(addYears(date, -i));
    }
    return timeline;
  }, []);

  const days = useMemo(() => {
    return GenerateDays(dateAdapter, date);
  }, [date]);

  const nextMonth = () => {
    const nextMonth = addMonths(date, 1);
    setDate(nextMonth);
  };

  const prevMonth = () => {
    const month = getMonth(date) - 1;
    const prevMonth = setMonth(date, month);
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
        setDate,
        timeLine,
      }}
    >
      {children}
    </DatepickerContext.Provider>
  );
}
