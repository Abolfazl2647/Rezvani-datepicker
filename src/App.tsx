// import DateFnsAdapter from "@date-io/date-fns";
import DateFnsJalaliAdapter from "@date-io/date-fns-jalali";
import { DatepickerProvider } from "./Datepicker/context";
import Datepicker from "./Datepicker";
import { useState } from "react";

export default function App() {
  const [inputDate, setDate] = useState<Date | null>(null);

  const handleSelectDay = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="App">
      <DatepickerProvider
        delimiter="/"
        dateFormat="yyyy/MM/dd"
        datepickerAdapter={DateFnsJalaliAdapter}
      >
        <Datepicker onDateSelect={handleSelectDay} value={inputDate} />
      </DatepickerProvider>

      <p>{inputDate?.toLocaleString()}</p>
    </div>
  );
}
