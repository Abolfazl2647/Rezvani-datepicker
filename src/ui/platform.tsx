import { useContext } from "react";
import { DatePickerContext } from "../core/context";
import PlatformStyle from "./style";
import Day from "./day";

// interface PlatformProps {}

export default function Platform() {
  const { days, adapter } = useContext(DatePickerContext);
  console.log("adapter", adapter && adapter.getWeekdays());
  if (adapter) {
    return (
      <PlatformStyle className="datepicker-wrapper">
        <div className="datepicker-actions">
          <button>next</button>
          <button>prev</button>
        </div>
        <div className="days-name-wrapper">
          {adapter.getWeekdays().map((item) => (
            <span className="day-name">{item}</span>
          ))}
        </div>
        <div className="days-wrapper">
          {days.map((item) => {
            const day = adapter.getDate(item);
            const month = adapter.getMonth(item);
            return <Day key={`${day}/${month}`}>{day}</Day>;
          })}
        </div>
        <div className="platform-actions"></div>
      </PlatformStyle>
    );
  }

  return null;
}
