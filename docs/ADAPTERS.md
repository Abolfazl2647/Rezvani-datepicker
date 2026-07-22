# Adapters

The datepicker library uses an adapter pattern to support multiple date libraries.
Every component works purely through the `DateAdapter<TDate>` interface — swap the
adapter and the same `<DatePicker>`/`<Calendar>` components work with a different
date library, with no other code changes.

## Available Adapters

### Native Date Adapter

Uses JavaScript's built-in Date object. No extra dependency.

```typescript
import { NativeDateAdapter } from "rezvani-datepicker/adapters/native";

const adapter = new NativeDateAdapter();
```

### Dayjs Adapter

```typescript
import { DayjsAdapter } from "rezvani-datepicker/adapters/dayjs";
import dayjs from "dayjs";

const adapter = new DayjsAdapter(dayjs);
```

Pass your own `dayjs` instance (with whatever plugins you've `.extend()`-ed already
applied) — the adapter doesn't call `dayjs.extend()` for you.

### Date-fns Adapter

```typescript
import { DateFnsAdapter } from "rezvani-datepicker/adapters/date-fns";

const adapter = new DateFnsAdapter();
```

### Installing the underlying library

`dayjs` and `date-fns` are optional peer dependencies — install whichever one you
use (or neither, if you only use `NativeDateAdapter`):

```bash
npm install dayjs        # if you use DayjsAdapter
npm install date-fns     # if you use DateFnsAdapter
```

## The `DateAdapter<TDate>` interface

```typescript
interface DateAdapter<TDate = any> {
  date(value?: any): TDate;
  today(): TDate;
  isValid(date: TDate): boolean;

  isEqual(date: TDate, value: TDate): boolean;    // exact-instant equality
  isSameDay(date: TDate, value: TDate): boolean;   // calendar-day equality
  isBefore(date: TDate, value: TDate): boolean;
  isAfter(date: TDate, value: TDate): boolean;

  addDays(date: TDate, amount: number): TDate;
  addWeeks(date: TDate, amount: number): TDate;
  addMonths(date: TDate, amount: number): TDate;
  addYears(date: TDate, amount: number): TDate;
  subtractDays(date: TDate, amount: number): TDate;
  subtractMonths(date: TDate, amount: number): TDate;
  subtractYears(date: TDate, amount: number): TDate;

  getYear(date: TDate): number;
  getMonth(date: TDate): number;   // 1-indexed (1 = January)
  getDate(date: TDate): number;
  getDay(date: TDate): number;     // 0 = Sunday
  getDaysInMonth(date: TDate): number;

  format(date: TDate, formatString: string): string;
  parse(value: string, formatString: string): TDate | null;

  startOfMonth(date: TDate): TDate;
  endOfMonth(date: TDate): TDate;
  startOfWeek(date: TDate, firstDayOfWeek?: number): TDate; // 0-6, 0 = Sunday
  endOfWeek(date: TDate, firstDayOfWeek?: number): TDate;
}
```

See [DateAdapter.ts](../src/adapters/DateAdapter.ts) for the authoritative source.

### `isEqual` vs `isSameDay`

These mean different things and are **not** interchangeable:

- `isEqual` — exact-instant equality (same millisecond). Two `Date`s that fall on
  the same calendar day but carry different times of day are **not** equal.
- `isSameDay` — calendar-day equality, ignoring time of day. This is what the
  library's own components use for "is this the selected day" / "is this a
  disabled day" checks, since a selected value and a freshly-generated grid cell
  can carry different times of day even when they represent the same day.

If you're writing code against an adapter directly, use `isSameDay` for anything
resembling "did the user pick this day", and reserve `isEqual` for genuine
instant-equality checks.

### Format/parse token dialects differ per adapter

`format()`/`parse()` are **not** portable across adapters — each one uses its
underlying library's own token vocabulary:

| Adapter | Token style | Example |
|---|---|---|
| `NativeDateAdapter` | Small numeric-only subset | `YYYY-MM-DD`, `YY`, `M`, `D` |
| `DayjsAdapter` | Dayjs/Moment-style tokens | `YYYY-MM-DD`, `MMMM`, `dddd` |
| `DateFnsAdapter` | date-fns's own (lowercase) unicode tokens | `yyyy-MM-dd` (uppercase `YYYY`/`DD` mean something different — ISO week-year / day-of-year) |

A format string configured for one adapter will not necessarily work for another —
pick the token dialect that matches whichever adapter you pass in. This is why the
library's own internal UI (month/year header label, weekday names, per-day
`aria-label`) does **not** use `adapter.format()` — it uses a small Intl-based
helper (`src/utils/locale.ts`) fed by `adapter.getYear`/`getMonth`/`getDate`, so it
behaves identically regardless of which adapter is in use. You only need to think
about token dialects for your own consumer-facing formatting (e.g. the `format`
prop on `<DatePicker>`).

`DayjsAdapter.parse()` additionally requires the consumer's `dayjs` instance to
have the `customParseFormat` plugin applied, or the `formatString` argument is
silently ignored:

```typescript
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const adapter = new DayjsAdapter(dayjs);
```

## Creating Custom Adapters

Implement the `DateAdapter` interface for your library's own date type:

```typescript
import type { DateAdapter } from "rezvani-datepicker";

class MyCustomAdapter implements DateAdapter<MyDateType> {
  date(value?: any): MyDateType {
    /* ... */
  }
  today(): MyDateType {
    /* ... */
  }
  isValid(date: MyDateType): boolean {
    /* ... */
  }
  isEqual(date: MyDateType, value: MyDateType): boolean {
    /* exact-instant equality */
  }
  isSameDay(date: MyDateType, value: MyDateType): boolean {
    /* calendar-day equality */
  }
  // ...implement the remaining methods — see the full interface above.
}
```

Prefer delegating to your date library's own primitives (e.g. `.daysInMonth()`,
`.subtract()`, `.isSame(x, 'day')`) rather than re-deriving them from scratch —
that's both less code and less likely to diverge from the library's own semantics
(this is what all three bundled adapters do).
