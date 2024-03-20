import { useContext } from "react";
import { DatepickerTimelineStyle } from "../style";
import { DatepickerContext } from "../context";

export default function DatepickerTimeline() {
  const { nextMonth, prevMonth } = useContext(DatepickerContext);
  return (
    <DatepickerTimelineStyle>
      <button onClick={prevMonth}>prev</button>
      <button onClick={nextMonth}>next</button>
    </DatepickerTimelineStyle>
  );
}
