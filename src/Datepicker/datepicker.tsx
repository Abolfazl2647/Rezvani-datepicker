import DatepickerTimeline from "./partials/datepickerTimeline";
import DatepickerActions from "./partials/datepickerActions";
import DatepickerDays from "./partials/datepickerDays";
import { PopOverStyle } from "./style";

export type onDayClickedType = (date: Date) => void;

interface DatepickerProps {
  slots?: {};
  onDayClicked: onDayClickedType;
}

export default function Datepicker({ onDayClicked }: DatepickerProps) {
  return (
    <PopOverStyle className="popover-wrapper">
      <DatepickerTimeline />
      <DatepickerDays onDayClicked={onDayClicked} />
      <DatepickerActions />
    </PopOverStyle>
  );
}
