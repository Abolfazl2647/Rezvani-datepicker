import { DatePickerActionsStyle } from "../style";

interface DatepickerActions {
  onDateSelected: () => void;
}

export default function DatepickerActions({
  onDateSelected,
}: DatepickerActions) {
  return (
    <DatePickerActionsStyle>
      <button onClick={onDateSelected}>ok</button>
      <button>cancel</button>
    </DatePickerActionsStyle>
  );
}
