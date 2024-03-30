import { useContext, useState } from "react";
import Close from "./icons/close";
import { DatepickerContext } from "../context";
import { TimelineStyle } from "../style";

interface TimelineProps {
  onClose: () => void;
}

interface CollabsibleYearProps {
  open: boolean;
  date: Date;
  onYearSelect: (year: number) => void;
  onClose: () => void;
}

function CollabsibleYear({
  open,
  date,
  onYearSelect,
  onClose,
}: CollabsibleYearProps) {
  const { dateAdapter, setDate } = useContext(DatepickerContext);
  const { getYear, getMonthArray, format } = dateAdapter;

  const handleSelectTimeline = (selectedDate: Date) => {
    setDate(selectedDate);
    if (onClose) onClose();
  };

  return (
    <div className="year-wrapper">
      <button onClick={() => onYearSelect(getYear(date))}>
        {getYear(date)}
      </button>
      {open && (
        <div className="month-wrapper">
          {getMonthArray(date).map((date) => {
            return (
              <button
                className="month"
                onClick={() => handleSelectTimeline(date)}
              >
                {format(date, "month")}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function TimeLineBox({ onClose }: TimelineProps) {
  const {
    timeLine,
    dateAdapter,
    date: datepickerDate,
  } = useContext(DatepickerContext);
  const { getYear } = dateAdapter;
  const [currentYear, setCurrentYear] = useState(getYear(datepickerDate));

  return (
    <TimelineStyle>
      <div className="timeline-head">
        <span className="year">{currentYear}</span>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      {timeLine.map((date) => {
        const year = getYear(date);
        return (
          <CollabsibleYear
            date={date}
            onYearSelect={(year) => setCurrentYear(year)}
            open={currentYear === year}
            onClose={onClose}
            key={getYear(date)}
          />
        );
      })}
    </TimelineStyle>
  );
}
