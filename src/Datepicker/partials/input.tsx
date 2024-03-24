import { ReactNode } from "react";
import SvgCalendarTick from "./CalendarTick";
import { TextfieldWrapperStyle } from "../style";

interface DatepickerTextfieldProps {
  onClick: () => void;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

export default function DatepickerTextfield({
  onClick,
  endAdornment,
  startAdornment,
}: DatepickerTextfieldProps) {
  return (
    <TextfieldWrapperStyle
      className="textfiled-wrapper"
      endAdornment={!!endAdornment}
      startAdornment={!!startAdornment}
    >
      {startAdornment ? (
        <span className="end-adornment">{startAdornment}</span>
      ) : null}

      <input onClick={onClick} />
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
