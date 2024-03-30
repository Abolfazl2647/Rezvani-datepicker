import { useContext } from "react";
import Day from "./day";
import { onDaySelectType } from "./day";
import { DatepickerContext } from "../context";
import { DaysWrapperStyle } from "../style";
import { DatepickerTextfieldValue } from "./input";

interface DatepickerDaysProps {
  onDaySelect: onDaySelectType;
  value: DatepickerTextfieldValue;
}

export default function DatepickerDays({ onDaySelect }: DatepickerDaysProps) {
  const { days } = useContext(DatepickerContext);

  return (
    <DaysWrapperStyle className="days-wrapper">
      {days.map((day) => {
        return (
          <Day key={day.toDateString()} date={day} onDaySelect={onDaySelect} />
        );
      })}
    </DaysWrapperStyle>
  );
}
