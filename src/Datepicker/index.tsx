import Datepicker from "./datepicker";

export default function DatepickerInput() {
  const handleDay = (date: Date) => {
    console.log("date", date);
  };

  return (
    <div>
      <input />
      <Datepicker onDayClicked={handleDay} />
    </div>
  );
}
