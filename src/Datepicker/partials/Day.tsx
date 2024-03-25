import { useContext } from "react";
import { onDayClickedType } from "../datepicker";
import { DatepickerContext } from "../context";

interface DayProps {
  onDayClicked: onDayClickedType;
  date: Date;
}

export default function Day({ onDayClicked, date }: DayProps) {
  const { dateAdapter } = useContext(DatepickerContext);

  let className = "day ";
  if (dateAdapter.isSameDay(date, new Date())) {
    className += "today";
  }

  return (
    <button className={className} onClick={() => onDayClicked(date)}>
      {dateAdapter.getDate(date)}
    </button>
  );
}
