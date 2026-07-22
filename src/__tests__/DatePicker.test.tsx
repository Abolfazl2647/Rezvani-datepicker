import { useState } from "react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DatePicker } from "../components/DatePicker";
import { NativeDateAdapter } from "../adapters/native";

const adapter = new NativeDateAdapter();

function Controlled(props: Partial<ComponentProps<typeof DatePicker<Date>>> = {}) {
  const [value, setValue] = useState<Date | null>(props.value ?? null);
  return (
    <DatePicker
      adapter={adapter}
      value={value}
      onChange={(date) => {
        setValue(date);
        props.onChange?.(date);
      }}
      {...props}
    />
  );
}

describe("DatePicker", () => {
  it("renders closed with the placeholder visible when unset", () => {
    render(<DatePicker adapter={adapter} placeholder="Select a date" />);
    const input = screen.getByPlaceholderText("Select a date") as HTMLInputElement;
    expect(input.value).toBe("");
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("opens the calendar on click and closes on outside click", () => {
    render(<DatePicker adapter={adapter} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("grid")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("opens on Enter/ArrowDown and closes on Escape, returning focus to the trigger", () => {
    render(<DatePicker adapter={adapter} />);
    const input = screen.getByRole("combobox");
    input.focus();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getByRole("grid")).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole("grid"), { key: "Escape" });
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(input);
  });

  it("selecting a day fires onChange and closes the popup", () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));

    const todayButton = screen.getByRole("button", { current: "date" });
    fireEvent.click(todayButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("does not select a disabled date", () => {
    const onChange = vi.fn();
    const today = adapter.today();
    render(
      <DatePicker adapter={adapter} onChange={onChange} maxDate={adapter.subtractDays(today, 1)} />
    );
    fireEvent.click(screen.getByRole("combobox"));

    const todayButton = screen.getByRole("button", { current: "date" });
    expect(todayButton).toBeDisabled();
    fireEvent.click(todayButton);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("shows a clear button once a value is set, which clears without reopening", () => {
    const onChange = vi.fn();
    render(<Controlled value={new Date(2024, 0, 15)} onChange={onChange} />);

    const clearButton = screen.getByRole("button", { name: "Clear date" });
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith(null);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });
});
