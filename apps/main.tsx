import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { DatePicker } from "date-picker";
import { TimePicker } from "time-picker";
import dayjs from "dayjs";
import { AdapterDayjs } from "date-picker/src/adapters/AdapterDayjs";

function App() {
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState("12:00");

  return (
    <div style={{ padding: 20 }}>
      <h2>Playground</h2>
      <DatePicker
        value={date}
        onChange={setDate}
        adapter={new AdapterDayjs()}
      />
      <br />
      <TimePicker value={time} onChange={setTime} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
