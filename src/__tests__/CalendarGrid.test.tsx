import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CalendarGrid } from "../components/CalendarGrid";
import { NativeDateAdapter } from "../adapters/native";
import { getWeeksInMonth } from "../utils/date-ranges";

const adapter = new NativeDateAdapter();

// 2024-01-17 is a Wednesday; January 2024 has 31 days.
const currentMonth = new Date(2024, 0, 15);

function renderGrid(overrides: Partial<ComponentProps<typeof CalendarGrid<Date>>> = {}) {
  const weeks = getWeeksInMonth(currentMonth, adapter, overrides.firstDayOfWeek ?? 0);
  const onSelectDay = vi.fn();
  const onNavigate = vi.fn();
  render(
    <CalendarGrid
      weeks={weeks}
      onSelectDay={onSelectDay}
      onNavigate={onNavigate}
      adapter={adapter}
      currentMonth={currentMonth}
      {...overrides}
    />
  );
  return { onSelectDay, onNavigate };
}

describe("CalendarGrid", () => {
  it("renders a grid with exactly one roving tabindex stop", () => {
    renderGrid();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    const dayButtons = screen.getAllByRole("button");
    const tabbable = dayButtons.filter((btn) => btn.getAttribute("tabindex") === "0");
    expect(tabbable).toHaveLength(1);
  });

  it("moves focus with the arrow keys", () => {
    renderGrid();
    const jan1 = screen.getByRole("button", { name: /January 1, 2024/ });
    jan1.focus();

    fireEvent.keyDown(jan1, { key: "ArrowRight" });
    expect(screen.getByRole("button", { name: /January 2, 2024/ })).toHaveFocus();
  });

  it("Home/End move to the start/end of the week", () => {
    renderGrid();
    const jan17 = screen.getByRole("button", { name: /January 17, 2024/ }); // Wednesday
    jan17.focus();

    fireEvent.keyDown(jan17, { key: "Home" });
    expect(screen.getByRole("button", { name: /January 14, 2024/ })).toHaveFocus(); // Sunday

    const sunday = screen.getByRole("button", { name: /January 14, 2024/ });
    fireEvent.keyDown(sunday, { key: "End" });
    expect(screen.getByRole("button", { name: /January 20, 2024/ })).toHaveFocus(); // Saturday
  });

  it("PageUp/PageDown navigate months and call onNavigate", () => {
    const { onNavigate } = renderGrid();
    const jan15 = screen.getByRole("button", { name: /January 15, 2024/ });
    jan15.focus();

    fireEvent.keyDown(jan15, { key: "PageDown" });
    expect(onNavigate).toHaveBeenCalledTimes(1);
    const [navigatedTo] = onNavigate.mock.calls[0];
    expect(adapter.getMonth(navigatedTo)).toBe(2);
  });

  it("marks the selected day with aria-selected and today with aria-current", () => {
    const today = adapter.today();
    renderGrid({
      weeks: getWeeksInMonth(today, adapter),
      currentMonth: today,
      selectedDate: today,
    });
    const todayButton = screen.getByRole("button", { current: "date" });
    expect(todayButton.closest('[role="gridcell"]')).toHaveAttribute("aria-selected", "true");
  });

  it("renders the weekday header rotated for firstDayOfWeek=1", () => {
    renderGrid({ firstDayOfWeek: 1 });
    const headers = screen.getAllByRole("columnheader").map((el) => el.textContent);
    expect(headers[0]).toBe(
      new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(new Date(2024, 0, 1)) // Monday
    );
  });
});
