import { useContext } from "react";
import { DatepickerContext } from "../../context";

export interface CollabsibleYearProps {
  open: boolean;
  date: Date;
  onYearSelect: (year: number) => void;
  onDaySelect: (date: Date) => void;
  onClose: () => void;
}

export default function CollabsibleYear({
  open,
  date,
  onYearSelect,
  onDaySelect,
  onClose,
}: CollabsibleYearProps) {
  const { dateAdapter, setDate } = useContext(DatepickerContext);
  const { getYear, getMonthArray, format } = dateAdapter;

  const handleSelectTimeline = (selectedDate: Date) => {
    setDate(selectedDate);
    onDaySelect(selectedDate);
    if (onClose) onClose();
  };

  return (
    <div className={open ? "year-row open" : "year-row"}>
      <button onClick={() => onYearSelect(getYear(date))}>
        {getYear(date)}
      </button>
      {open && (
        <div className="month-wrapper">
          {getMonthArray(date).map((date) => {
            return (
              <button
                className="month"
                key={format(date, "monthAndYear")}
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
