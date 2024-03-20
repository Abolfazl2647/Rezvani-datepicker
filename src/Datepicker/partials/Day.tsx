import { useContext } from "react";
import { onDayClickedType } from "../datepicker";
import { DatepickerContext } from "../context";

interface DayProps {
  onDayClicked: onDayClickedType;
  date: Date;
}

export default function Day({ onDayClicked, date }: DayProps) {
  const { dateAdapter } = useContext(DatepickerContext);

  return (
    <button className="day" onClick={() => onDayClicked(date)}>
      {dateAdapter.getDate(date)}
    </button>
  );
}
