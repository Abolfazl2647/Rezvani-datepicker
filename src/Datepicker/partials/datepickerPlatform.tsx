import DatepickerTimeline from "./datepickerTimeline";
import DatepickerActions from "./datepickerActions";
import DatepickerDays from "./datepickerDays";
import { onDaySelectType } from "./day";
import { PopOverStyle } from "../style";

interface DatepickerProps {
  onDaySelect: onDaySelectType;
}

export default function DatepickerPlatform({ onDaySelect }: DatepickerProps) {
  return (
    <PopOverStyle className="popover-wrapper">
      <DatepickerTimeline />
      <DatepickerDays onDaySelect={onDaySelect} />
      <DatepickerActions />
    </PopOverStyle>
  );
}
