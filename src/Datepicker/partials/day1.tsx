import { useContext } from "react";
import { DatepickerContext } from "../context";

export type onDaySelectType = (date: Date) => void;

interface DayProps {
  onDaySelect: onDaySelectType;
  date: Date;
}

export default function Day({ onDaySelect, date }: DayProps) {
  const {
    dateAdapter,
    date: pickerDate,
    setDate,
  } = useContext(DatepickerContext);
  const { isSameDay, isSameMonth } = dateAdapter;

  let className = "day";
  if (isSameMonth(date, pickerDate)) {
    className += " active-month ";
  }

  if (isSameDay(date, new Date())) {
    className += " today ";
  }

  if (isSameDay(date, pickerDate)) {
    className += " selected ";
  }

  const handleSelectDay = () => {
    setDate(date);
    onDaySelect(date);
  };

  return (
    <button className={className} onClick={handleSelectDay}>
      {dateAdapter.getDate(date)}
    </button>
  );
}
