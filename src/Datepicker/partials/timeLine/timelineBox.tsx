import { useContext, useState } from "react";
import { DatepickerContext } from "../../context";
import { TimelineStyle } from "../../style";
import Close from "../icons/Close";
import CollabsibleYear from "./timelineColapseYear";

interface TimelineProps {
  onClose: () => void;
  onDaySelect: (date: Date) => void;
}

export default function TimeLineBox({ onClose, onDaySelect }: TimelineProps) {
  const {
    timeLine,
    dateAdapter,
    date: datepickerDate,
  } = useContext(DatepickerContext);
  const { getYear } = dateAdapter;
  const [currentYear, setCurrentYear] = useState(getYear(datepickerDate));

  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
  };
  return (
    <TimelineStyle>
      <div className="timeline-head">
        <span className="year">{currentYear}</span>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="year-wrapper">
        {timeLine.map((date) => {
          const year = getYear(date);
          return (
            <CollabsibleYear
              date={date}
              onDaySelect={onDaySelect}
              onYearSelect={handleYearSelect}
              open={currentYear === year}
              onClose={onClose}
              key={getYear(date)}
            />
          );
        })}
      </div>
    </TimelineStyle>
  );
}
