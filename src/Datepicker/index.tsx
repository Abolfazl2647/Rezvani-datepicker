import DatepickerTimeline from "./partials/datepickerTimeline";
import DatepickerActions from "./partials/datepickerActions";
import DatepickerDays from "./partials/datepickerDays";
import DatepickerStyle from "./style";

export type onDayClickedType = (date: Date) => void;

interface DatepickerProps {
  slots?: {};
  onDayClicked: onDayClickedType;
}

export default function Datepicker({ onDayClicked }: DatepickerProps) {
  return (
    <DatepickerStyle>
      <DatepickerTimeline />
      <DatepickerDays onDayClicked={onDayClicked} />
      <DatepickerActions />
    </DatepickerStyle>
  );
}
