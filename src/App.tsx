import DateFnsAdapter from "@date-io/date-fns";
import { DatepickerProvider } from "./Datepicker/context";
import Datepicker from "./Datepicker";

export default function App() {
  const handleDay = (date: Date) => {
    console.log("date", date);
  };

  return (
    <div>
      <DatepickerProvider DateAdapter={DateFnsAdapter}>
        <Datepicker onDayClicked={handleDay} />
      </DatepickerProvider>
    </div>
  );
}
