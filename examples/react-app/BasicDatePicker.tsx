import { useState } from "react";
import { DatePicker } from "../../src/components";
import { NativeDateAdapter } from "../../src/adapters/native";

const adapter = new NativeDateAdapter();

export function BasicDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Basic Date Picker</h1>
      <p>Selected date: {date ? date.toLocaleDateString() : "None"}</p>
      <DatePicker
        value={date}
        onChange={setDate}
        adapter={adapter}
        placeholder="Select a date"
      />
    </div>
  );
}
