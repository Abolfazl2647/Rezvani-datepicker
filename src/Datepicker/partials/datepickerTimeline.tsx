import { useContext } from "react";
import { DatepickerTimelineStyle } from "../style";
import { DatepickerContext } from "../context";
import SvgArrowLeftMini from "./ArrowLeftMini";
import SvgArrowRightMini from "./ArrowRightMini";

export default function DatepickerTimeline() {
  const { nextMonth, prevMonth } = useContext(DatepickerContext);
  return (
    <DatepickerTimelineStyle>
      <button onClick={prevMonth}>
        <SvgArrowLeftMini />
      </button>
      <button onClick={nextMonth}>
        <SvgArrowRightMini />
      </button>
    </DatepickerTimelineStyle>
  );
}
