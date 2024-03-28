import { ReactNode, useState, useContext, useEffect } from "react";
import { IMaskInput } from "react-imask";
import SvgCalendarTick from "./icons/CalendarTick";
import { TextfieldWrapperStyle } from "../style";
import { DatepickerContext } from "../context";

export type DatepickerTextfieldValue = Date | null | "";
export type DatepickerTextfiledonChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;

type Delimiter = "/" | "-";

interface DatepickerTextfieldProps {
  onClick: () => void;
  delimiter: Delimiter;
  onChange?: DatepickerTextfiledonChange;
  value: DatepickerTextfieldValue;
  name?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

// I need a parser for input type

function parseMask(string: string, delimiter: Delimiter = "/"): string {
  const array = string.split(delimiter);
  const newArray = array.map((part) => {
    const newString = part.replace(/[mMyYdD]/g, "_");
    return newString;
  });
  return newArray.join(delimiter);
}

export default function DatepickerTextfield({
  onClick,
  onChange,
  value = "",
  name = "",
  delimiter,
  endAdornment,
  startAdornment,
}: DatepickerTextfieldProps) {
  const [input, setInput] = useState<string>();
  const { dateAdapter, dateFormat } = useContext(DatepickerContext);

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
        mask={parseMask(dateFormat, delimiter)}
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
