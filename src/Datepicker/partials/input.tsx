import { ReactNode, useState, useContext, useEffect } from "react";
import SvgCalendarTick from "./icons/CalendarTick";
import { TextfieldWrapperStyle } from "../style";
import { DatepickerContext } from "../context";

export type DatepickerTextfieldValue = Date | null | "";
export type DatepickerTextfiledonChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;

interface DatepickerTextfieldProps {
  onClick: () => void;
  onChange?: DatepickerTextfiledonChange;
  value: DatepickerTextfieldValue;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

export default function DatepickerTextfield({
  onClick,
  onChange,
  value = "",
  endAdornment,
  startAdornment,
}: DatepickerTextfieldProps) {
  const [input, setInput] = useState<string>();
  const { dateAdapter, dateFormat } = useContext(DatepickerContext);

  useEffect(() => {
    if (value) {
      const string = dateAdapter.formatByString(value, dateFormat);
      setInput(string);
    }
  }, [value]);

  return (
    <TextfieldWrapperStyle
      className="textfiled-wrapper"
      endAdornment={!!endAdornment}
      startAdornment={!!startAdornment}
    >
      {startAdornment ? (
        <span className="end-adornment">{startAdornment}</span>
      ) : null}

      <input onChange={onChange} value={input} onClick={onClick} />

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
