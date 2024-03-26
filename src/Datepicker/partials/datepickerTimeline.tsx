import { useContext } from "react";
import { DatepickerTimelineStyle } from "../style";
import { DatepickerContext } from "../context";
import SvgArrowLeftMini from "./icons/ArrowLeftMini";
import SvgArrowRightMini from "./icons/ArrowRightMini";

export default function DatepickerTimeline() {
  const { nextMonth, prevMonth, dateAdapter, date } =
    useContext(DatepickerContext);

  const { format } = dateAdapter;
  return (
    <DatepickerTimelineStyle>
      <div className="year-month-picker">
        <button className="month">{format(date, "month")}</button>
        <button className="year">{format(date, "year")}</button>
      </div>
      <button className="prev-month" onClick={prevMonth}>
        <SvgArrowLeftMini />
      </button>
      <button className="next-month" onClick={nextMonth}>
        <SvgArrowRightMini />
      </button>
    </DatepickerTimelineStyle>
  );
}
