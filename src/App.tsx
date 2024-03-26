// import DateFnsAdapter from "@date-io/date-fns";
import DateFnsJalaliAdapter from "@date-io/date-fns-jalali";
import { DatepickerProvider } from "./Datepicker/context";
import Datepicker from "./Datepicker";
import { useState } from "react";

export default function App() {
  const [inputDate, setDate] = useState<Date | null>(null);
  const handleChange = (date: Date) => setDate(date);

  return (
    <div className="App">
      <DatepickerProvider DateAdapter={DateFnsJalaliAdapter}>
        <Datepicker onChange={handleChange} value={inputDate} />
      </DatepickerProvider>
    </div>
  );
}
