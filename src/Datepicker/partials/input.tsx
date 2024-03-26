import { ReactNode, useContext } from "react";
import SvgCalendarTick from "./icons/CalendarTick";
import { TextfieldWrapperStyle } from "../style";
import { DatepickerContext } from "../context";

export type DatepickerTextfieldValue = Date | null;

interface DatepickerTextfieldProps {
  onClick: () => void;
  value: DatepickerTextfieldValue;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

export default function DatepickerTextfield({
  onClick,
  value,
  endAdornment,
  startAdornment,
}: DatepickerTextfieldProps) {
  const { dateAdapter } = useContext(DatepickerContext);

  return (
    <TextfieldWrapperStyle
      className="textfiled-wrapper"
      endAdornment={!!endAdornment}
      startAdornment={!!startAdornment}
    >
      {startAdornment ? (
        <span className="end-adornment">{startAdornment}</span>
      ) : null}

      <input
        value={value ? dateAdapter.formatByString(value, "yyyy/MM/dd") : ""}
        onClick={onClick}
      />

      {endAdornment ? (
        <span className="end-adornment">{endAdornment}</span>
      ) : (
        <span className="end-adornment">
          <SvgCalendarTick />
        </span>
      )}
    </TextfieldWrapperStyle>
  );
}
