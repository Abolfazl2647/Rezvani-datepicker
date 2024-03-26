import { useState, useEffect, useRef } from "react";
import Datepicker from "./datepicker";
import DatepickerTextfield from "./partials/input";
import { DatepickerTextfieldValue } from "./partials/input";
import DatepickerStyleWrapper from "./style";

interface DatepickerInputProps {
  onChange: (date: Date) => void;
  value: DatepickerTextfieldValue;
}

export default function DatepickerInput({
  onChange,
  value,
}: DatepickerInputProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocuesed] = useState(false);

  const handleDay = (date: Date) => {
    if (onChange) onChange(date);
  };

  const handleFocues = () => setIsFocuesed(true);

  // handle Click outSide
  const handleClickoutSide = () => setIsFocuesed(false);
  useEffect(() => {
    const clickedOutside = (event: MouseEvent) => {
      const node = event?.target as HTMLElement;
      if (!ref.current?.contains(node)) {
        handleClickoutSide();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", clickedOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [ref]);

  return (
    <DatepickerStyleWrapper className="datepicker-wrapper" ref={ref}>
      <DatepickerTextfield onClick={handleFocues} value={value} />
      {isFocused && <Datepicker onDayClicked={handleDay} />}
    </DatepickerStyleWrapper>
  );
}
