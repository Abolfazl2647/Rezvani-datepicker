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
  onDateSelect?: (date: Date) => void;
  value: DatepickerTextfieldValue;
  name?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

export default function DatepickerTextfield({
  onClick,
  onChange,
  onDateSelect,
  value = "",
  name = "",
  endAdornment,
  startAdornment,
}: DatepickerTextfieldProps) {
  const [input, setInput] = useState<string>();
  const { dateAdapter, dateFormat, mask } = useContext(DatepickerContext);
  const { parse, isValid, formatByString } = dateAdapter;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setInput(target.value);
    if (isValid(target.value) && mask.length === target.value.length) {
      const date = parse(target.value, dateFormat);
      if (onDateSelect && date) onDateSelect(date);
    }
    if (onChange) onChange(e);
  };

  useEffect(() => {
    if (value) {
      const string = formatByString(value, dateFormat);
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
