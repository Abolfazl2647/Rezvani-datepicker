import DateFnsAdapter from "@date-io/date-fns";
import { enUS } from "date-fns/locale/en-US";

import Platform from "./platform";
import DatepickerProvider from "../core/context";

export default function Datepicker() {
  const DateFnAdapter = new DateFnsAdapter({ locale: enUS });

  return (
    <DatepickerProvider adapter={DateFnAdapter}>
      <Platform />
    </DatepickerProvider>
  );
}
