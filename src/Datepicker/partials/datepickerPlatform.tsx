import DatepickerTimeline from "./timeLine/datepickerTimeline";
// import DatepickerActions from "./datepickerActions";
import DatepickerDays from "./datepickerDays";
import { DatepickerTextfieldValue } from "./input";
import { onDaySelectType } from "./day";
import { PopOverStyle } from "../style";

interface DatepickerProps {
  onDaySelect: onDaySelectType;
  value: DatepickerTextfieldValue;
}

export default function DatepickerPlatform({
  onDaySelect,
  value,
}: DatepickerProps) {
  // const handleDateSelected = () => {};

  return (
    <PopOverStyle className="popover-wrapper">
      <DatepickerTimeline onDaySelect={onDaySelect} />
      <DatepickerDays onDaySelect={onDaySelect} value={value} />
      {/* <DatepickerActions onDateSelected={handleDateSelected} /> */}
    </PopOverStyle>
  );
}
