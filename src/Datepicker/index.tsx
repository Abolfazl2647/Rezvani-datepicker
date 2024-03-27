import { useState, useEffect, useRef } from "react";
import Datepicker from "./partials/datepickerPlatform";
import DatepickerTextfield from "./partials/input";
import {
  DatepickerTextfieldValue,
  DatepickerTextfiledonChange,
} from "./partials/input";
import DatepickerStyleWrapper from "./style";

interface DatepickerInputProps {
  onChange?: DatepickerTextfiledonChange;
  value: DatepickerTextfieldValue;
  onDateSelect: (date: Date) => void;
}

export default function DatepickerInput({
  onChange,
  onDateSelect,
  value,
}: DatepickerInputProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocuesed] = useState(false);

  const handleDaySelect = (date: Date) => {
    if (onDateSelect) onDateSelect(date);
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
      <DatepickerTextfield
        onChange={onChange}
        onClick={handleFocues}
        value={value}
      />
      {isFocused && <Datepicker onDaySelect={handleDaySelect} />}
    </DatepickerStyleWrapper>
  );
}
