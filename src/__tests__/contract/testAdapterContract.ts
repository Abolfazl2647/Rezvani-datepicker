import { describe, expect, it } from "vitest";
import type { DateAdapter } from "../../adapters/DateAdapter";

export interface AdapterContractOptions {
  /** A format string in this adapter's own token dialect, e.g. "YYYY-MM-DD" or "yyyy-MM-dd". */
  formatString: string;
}

/**
 * Runs the same behavioral-parity suite against any `DateAdapter` implementation.
 * Deliberately does NOT assert identical `format()` output across adapters — each
 * adapter uses its underlying library's own token dialect (see docs/ADAPTERS.md).
 */
export function testAdapterContract<TDate>(
  name: string,
  createAdapter: () => DateAdapter<TDate>,
  { formatString }: AdapterContractOptions
) {
  describe(`${name} adapter contract`, () => {
    const adapter = createAdapter();

    it("date()/today() produce valid dates", () => {
      expect(adapter.isValid(adapter.date())).toBe(true);
      expect(adapter.isValid(adapter.today())).toBe(true);
    });

    it("isValid() rejects an invalid date", () => {
      expect(adapter.isValid(adapter.date(NaN))).toBe(false);
    });

    it("isEqual() is exact-instant, isSameDay() is calendar-day", () => {
      const morning = adapter.date(new Date(2024, 0, 15, 9, 0, 0));
      const evening = adapter.date(new Date(2024, 0, 15, 18, 0, 0));
      const otherDay = adapter.date(new Date(2024, 0, 16, 9, 0, 0));

      expect(adapter.isSameDay(morning, evening)).toBe(true);
      expect(adapter.isEqual(morning, evening)).toBe(false);
      expect(adapter.isSameDay(morning, otherDay)).toBe(false);
      expect(adapter.isEqual(morning, morning)).toBe(true);
    });

    it("isBefore()/isAfter() compare instants", () => {
      const earlier = adapter.date(new Date(2024, 0, 1));
      const later = adapter.date(new Date(2024, 0, 2));
      expect(adapter.isBefore(earlier, later)).toBe(true);
      expect(adapter.isAfter(later, earlier)).toBe(true);
      expect(adapter.isBefore(later, earlier)).toBe(false);
    });

    it("addDays()/subtractDays() are inverses", () => {
      const base = adapter.date(new Date(2024, 0, 15));
      const forward = adapter.addDays(base, 5);
      expect(adapter.getDate(forward)).toBe(20);
      expect(adapter.isSameDay(adapter.subtractDays(forward, 5), base)).toBe(true);
    });

    it("addWeeks() moves by 7 days", () => {
      const base = adapter.date(new Date(2024, 0, 1));
      const oneWeekLater = adapter.addWeeks(base, 1);
      expect(adapter.isSameDay(oneWeekLater, adapter.addDays(base, 7))).toBe(true);
    });

    it("addMonths()/addYears() clamp to the target month's last day (no overflow rollover)", () => {
      const jan31_2023 = adapter.date(new Date(2023, 0, 31)); // non-leap year
      const feb = adapter.addMonths(jan31_2023, 1);
      expect(adapter.getMonth(feb)).toBe(2);
      expect(adapter.getDate(feb)).toBe(28);

      const feb29_2024 = adapter.date(new Date(2024, 1, 29)); // leap day
      const nonLeapNextYear = adapter.addYears(feb29_2024, 1);
      expect(adapter.getMonth(nonLeapNextYear)).toBe(2);
      expect(adapter.getDate(nonLeapNextYear)).toBe(28);
    });

    it("subtractMonths()/subtractYears() mirror addMonths()/addYears()", () => {
      const mar31 = adapter.date(new Date(2023, 2, 31));
      const feb = adapter.subtractMonths(mar31, 1);
      expect(adapter.getMonth(feb)).toBe(2);
      expect(adapter.getDate(feb)).toBe(28);
    });

    it("getDaysInMonth() across leap/non-leap/30/31-day months", () => {
      expect(adapter.getDaysInMonth(adapter.date(new Date(2024, 1, 1)))).toBe(29); // Feb 2024 (leap)
      expect(adapter.getDaysInMonth(adapter.date(new Date(2023, 1, 1)))).toBe(28); // Feb 2023
      expect(adapter.getDaysInMonth(adapter.date(new Date(2023, 3, 1)))).toBe(30); // April
      expect(adapter.getDaysInMonth(adapter.date(new Date(2023, 0, 1)))).toBe(31); // January
    });

    it("startOfMonth()/endOfMonth() bound the month", () => {
      const mid = adapter.date(new Date(2023, 3, 15));
      expect(adapter.getDate(adapter.startOfMonth(mid))).toBe(1);
      expect(adapter.getDate(adapter.endOfMonth(mid))).toBe(30);
    });

    it("startOfWeek()/endOfWeek() honor an explicit firstDayOfWeek", () => {
      const wednesday = adapter.date(new Date(2024, 0, 17)); // 2024-01-17 is a Wednesday
      expect(adapter.getDay(adapter.startOfWeek(wednesday, 0))).toBe(0);
      expect(adapter.getDay(adapter.startOfWeek(wednesday, 1))).toBe(1);
      expect(adapter.getDay(adapter.endOfWeek(wednesday, 1))).toBe(0);
    });

    it("format()/parse() round-trip using this adapter's own tokens", () => {
      const original = adapter.date(new Date(2023, 5, 9));
      const formatted = adapter.format(original, formatString);
      const parsed = adapter.parse(formatted, formatString);
      expect(parsed).not.toBeNull();
      expect(adapter.isSameDay(parsed as TDate, original)).toBe(true);
    });

    it("parse() rejects a value that doesn't match the format", () => {
      expect(adapter.parse("not-a-date-at-all", formatString)).toBeNull();
    });
  });
}
