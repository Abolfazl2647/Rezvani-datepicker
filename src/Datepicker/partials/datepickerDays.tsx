import { useContext } from "react";
import Day from "./day";
import { onDayClickedType } from "../datepicker";
import { DatepickerContext } from "../context";
import { DaysWrapperStyle } from "../style";

interface DatepickerDaysProps {
  onDayClicked: onDayClickedType;
}

export default function DatepickerDays({ onDayClicked }: DatepickerDaysProps) {
  const { days } = useContext(DatepickerContext);

  return (
    <DaysWrapperStyle className="days-wrapper">
      {days.map((day) => {
        return (
          <Day
            key={day.toDateString()}
            date={day}
            onDayClicked={onDayClicked}
          />
        );
      })}
    </DaysWrapperStyle>
  );
}
