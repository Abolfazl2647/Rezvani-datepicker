import { useContext } from "react";
import { DatepickerContext } from "../context";

export type onDaySelectType = (date: Date) => void;

interface DayProps {
  onDaySelect: onDaySelectType;
  date: Date;
}

export default function Day({ onDaySelect, date }: DayProps) {
  const { dateAdapter } = useContext(DatepickerContext);

  let className = "day ";
  if (dateAdapter.isSameDay(date, new Date())) {
    className += "today";
  }

  return (
    <button className={className} onClick={() => onDaySelect(date)}>
      {dateAdapter.getDate(date)}
    </button>
  );
}
