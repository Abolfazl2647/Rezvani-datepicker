import DatepickerTimeline from "./datepickerTimeline";
import DatepickerActions from "./datepickerActions";
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
  return (
    <PopOverStyle className="popover-wrapper">
      <DatepickerTimeline />
      <DatepickerDays onDaySelect={onDaySelect} value={value} />
      <DatepickerActions />
    </PopOverStyle>
  );
}
