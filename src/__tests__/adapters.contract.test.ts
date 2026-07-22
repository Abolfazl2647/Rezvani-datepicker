import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { NativeDateAdapter } from "../adapters/native";
import { DayjsAdapter } from "../adapters/dayjs";
import { DateFnsAdapter } from "../adapters/date-fns";
import { testAdapterContract } from "./contract/testAdapterContract";

dayjs.extend(customParseFormat);

testAdapterContract("Native", () => new NativeDateAdapter(), {
  formatString: "YYYY-MM-DD",
});

testAdapterContract("Dayjs", () => new DayjsAdapter(dayjs), {
  formatString: "YYYY-MM-DD",
});

testAdapterContract("date-fns", () => new DateFnsAdapter(), {
  formatString: "yyyy-MM-dd",
});
