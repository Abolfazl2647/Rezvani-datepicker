import { useContext, useState } from "react";
import { DatepickerTimelineStyle } from "../../style";
import { DatepickerContext } from "../../context";
import SvgArrowLeftMini from "../icons/ArrowLeftMini";
import SvgArrowRightMini from "../icons/ArrowRightMini";
import TimelineBox from "./timelineBox";

interface DatepickerTimelineProps {
  onDaySelect: (date: Date) => void;
}

export default function DatepickerTimeline({
  onDaySelect,
}: DatepickerTimelineProps) {
  const [timelineState, setTimelineState] = useState(false);
  const { nextMonth, prevMonth, dateAdapter, date } =
    useContext(DatepickerContext);
  const { format } = dateAdapter;

  const showTimeline = () => setTimelineState(true);
  const closeTimeline = () => setTimelineState(false);

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
      {timelineState && (
        <TimelineBox onClose={closeTimeline} onDaySelect={onDaySelect} />
      )}
    </DatepickerTimelineStyle>
  );
}
