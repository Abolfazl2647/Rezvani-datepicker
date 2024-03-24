import { useState, useEffect, useRef } from "react";
import Datepicker from "./datepicker";
import DatepickerTextfield from "./partials/input";
import DatepickerStyleWrapper from "./style";

export default function DatepickerInput() {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocuesed] = useState(false);

  const handleDay = (date: Date) => {
    console.log("date", date);
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
      <DatepickerTextfield onClick={handleFocues} />
      {isFocused && <Datepicker onDayClicked={handleDay} />}
    </DatepickerStyleWrapper>
  );
}
