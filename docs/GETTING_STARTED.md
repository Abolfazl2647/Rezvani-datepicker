# Getting Started

## Installation

```bash
npm install rezvani-datepicker
```

### With Dayjs

```bash
npm install rezvani-datepicker dayjs
```

### With date-fns

```bash
npm install rezvani-datepicker date-fns
```

## Basic Setup

### Step 1: Import Styles

```typescript
import "rezvani-datepicker/styles";
```

### Step 2: Choose an Adapter

Pick the date library that best fits your needs.

### Step 3: Create Component

```typescript
import React from "react";
import { DatePicker, NativeDateAdapter } from "rezvani-datepicker";
import "rezvani-datepicker/styles";

const adapter = new NativeDateAdapter();

function MyApp() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      adapter={adapter}
      placeholder="Select a date"
    />
  );
}

export default MyApp;
```

## Customization

### With Min/Max Dates

```typescript
<DatePicker
  value={date}
  onChange={setDate}
  adapter={adapter}
  minDate={new Date("2024-01-01")}
  maxDate={new Date("2024-12-31")}
/>
```

### With Disabled Dates

```typescript
<DatePicker
  value={date}
  onChange={setDate}
  adapter={adapter}
  disabledDates={[new Date("2024-12-25"), new Date("2024-12-26")]}
/>
```

### With Custom Format

```typescript
<DatePicker
  value={date}
  onChange={setDate}
  adapter={adapter}
  format="DD/MM/YYYY"
/>
```

## Next Steps

- Check [API documentation](API.md)
- See [Adapter guide](ADAPTERS.md)
- Explore [Examples](../examples)
