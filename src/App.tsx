// import DateFnsAdapter from "@date-io/date-fns";
import DateFnsJalaliAdapter from "@date-io/date-fns-jalali";
import { DatepickerProvider } from "./Datepicker/context";
import Datepicker from "./Datepicker";
import { useState } from "react";

export default function App() {
  const [inputDate, setDate] = useState<Date | null>(null);
  const handleSelectDay = (date: Date) => setDate(date);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    console.log(target.value);
  };

  return (
    <div className="App">
      <DatepickerProvider
        datepickerAdapter={DateFnsJalaliAdapter}
        dateFormat="yyyy/MM/dd"
      >
        <Datepicker
          onDateSelect={handleSelectDay}
          value={inputDate}
          onChange={handleChange}
        />
      </DatepickerProvider>
    </div>
  );
}
