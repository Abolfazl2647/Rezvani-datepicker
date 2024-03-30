import { useContext, useState } from "react";
import { DatepickerTimelineStyle } from "../style";
import { DatepickerContext } from "../context";
import SvgArrowLeftMini from "./icons/ArrowLeftMini";
import SvgArrowRightMini from "./icons/ArrowRightMini";
import TimelineBox from "./timelineBox";

export default function DatepickerTimeline() {
  const [timelineState, setTimelineState] = useState(false);
  const { nextMonth, prevMonth, dateAdapter, date } =
    useContext(DatepickerContext);

  const showTimeline = () => setTimelineState(true);
  const closeTimeline = () => setTimelineState(false);

  const { format } = dateAdapter;
  return (
    <DatepickerTimelineStyle>
      <div className="year-month-picker">
        <button className="btn month" onClick={showTimeline}>
          {format(date, "monthAndYear")}
        </button>
      </div>
      <button className="btn prev-month" onClick={prevMonth}>
        <SvgArrowLeftMini />
      </button>
      <button className="btn next-month" onClick={nextMonth}>
        <SvgArrowRightMini />
      </button>
      {timelineState && <TimelineBox onClose={closeTimeline} />}
    </DatepickerTimelineStyle>
  );
}
