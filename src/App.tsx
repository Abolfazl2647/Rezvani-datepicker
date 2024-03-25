// import DateFnsAdapter from "@date-io/date-fns";
import DateFnsJalaliAdapter from "@date-io/date-fns-jalali";
import { DatepickerProvider } from "./Datepicker/context";
import Datepicker from "./Datepicker";

export default function App() {
  return (
    <div className="App">
      <DatepickerProvider DateAdapter={DateFnsJalaliAdapter} locale="faIR">
        <Datepicker />
      </DatepickerProvider>
    </div>
  );
}
