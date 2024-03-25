import { useState, createContext, useMemo } from "react";
import { IUtils } from "@date-io/core/IUtils";
import GenerateDays from "./generateDays";

interface DatepickerProviderProps {
  children: React.ReactNode;
  locale?: string;
  DateAdapter: new (...args: any) => IUtils<Date>;
}

interface DatepickerContextProps {
  dateAdapter: IUtils<Date>;
  days: Array<Date>;
  date: Date;
  nextMonth: () => void;
  prevMonth: () => void;
}

export const DatepickerContext = createContext({} as DatepickerContextProps);

export function DatepickerProvider({
  children,
  DateAdapter,
  locale,
}: DatepickerProviderProps) {
  const [date, setDate] = useState(new Date());

  const dateAdapter = new DateAdapter({ locale });
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

  return (
    <DatepickerContext.Provider
      value={{ days, date, dateAdapter, nextMonth, prevMonth }}
    >
      {children}
    </DatepickerContext.Provider>
  );
}
