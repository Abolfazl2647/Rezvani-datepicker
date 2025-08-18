import React from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export function TimePicker({ value, onChange }: Props) {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ border: "1px solid gray", padding: 4 }}
    />
  );
}
