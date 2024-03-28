import { ReactNode, useState, useContext, useEffect } from "react";
import { IMaskInput } from "react-imask";
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
  name?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

// I need a parser for input type

export default function DatepickerTextfield({
  onClick,
  onChange,
  value = "",
  name = "",
  endAdornment,
  startAdornment,
}: DatepickerTextfieldProps) {
  const [input, setInput] = useState<string>();
  const { dateAdapter, dateFormat, mask } = useContext(DatepickerContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setInput(target.value);
    if (onChange) onChange(e);
  };

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

      <IMaskInput
        mask={mask}
        placeholder={dateFormat}
        value={input}
        onChange={handleChange}
        onClick={onClick}
        unmask
        onAccept={(value) => {
          if (onChange)
            onChange({
              target: { name, value },
            } as React.ChangeEvent<HTMLInputElement>);
        }}
        overwrite
        definitions={{
          _: /[0-9]/,
        }}
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
