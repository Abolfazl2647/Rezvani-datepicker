import React from "react";

export function BasicDatePicker() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Basic Date Picker</h1>
      <p>Selected date: {date ? date.toLocaleDateString() : "None"}</p>
      {/* DatePicker component will go here */}
    </div>
  );
}
