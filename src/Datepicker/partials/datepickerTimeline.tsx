import { useContext } from "react";
import { DatepickerTimelineStyle } from "../style";
import { DatepickerContext } from "../context";
import SvgArrowLeftMini from "./icons/ArrowLeftMini";
import SvgArrowRightMini from "./icons/ArrowRightMini";

export default function DatepickerTimeline() {
  const { nextMonth, prevMonth, dateAdapter, date } =
    useContext(DatepickerContext);
  return (
    <DatepickerTimelineStyle>
      <button onClick={prevMonth}>
        <SvgArrowLeftMini />
      </button>
      <div className="year-month-picker">
        <button className="month">{dateAdapter.getMonth(date) + 1}</button>
        <button className="year">{dateAdapter.getYear(date)}</button>
      </div>
      <button onClick={nextMonth}>
        <SvgArrowRightMini />
      </button>
    </DatepickerTimelineStyle>
  );
}
