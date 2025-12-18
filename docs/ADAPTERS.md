# Adapters

The datepicker library uses an adapter pattern to support multiple date libraries.

## Available Adapters

### Native Date Adapter

Uses JavaScript's built-in Date object.

```typescript
import { NativeDateAdapter } from "rezvani-datepicker/adapters/native";

const adapter = new NativeDateAdapter();
```

**Pros:**

- No additional dependencies
- Works out of the box
- Good for simple use cases

**Cons:**

- Limited formatting options
- Date mutation issues
- Timezone handling challenges

### Dayjs Adapter

Lightweight and highly customizable date library.

```typescript
import { DayjsAdapter } from "rezvani-datepicker/adapters/dayjs";
import dayjs from "dayjs";

const adapter = new DayjsAdapter(dayjs);
```

**Pros:**

- 2KB gzipped
- Immutable by design
- Great locale support
- Plugin system

### Date-fns Adapter

Modern and modular approach to date manipulation.

```typescript
import { DateFnsAdapter } from "rezvani-datepicker/adapters/date-fns";

const adapter = new DateFnsAdapter();
```

**Pros:**

- Modular, tree-shakeable functions
- Functional programming approach
- Excellent documentation
- TypeScript first

## Creating Custom Adapters

Implement the `DateAdapter` interface:

```typescript
import { DateAdapter } from "rezvani-datepicker";

class MyCustomAdapter implements DateAdapter<MyDateType> {
  date(value?: any): MyDateType {
    // Implementation
  }

  isBefore(date: MyDateType, value: MyDateType): boolean {
    // Implementation
  }

  // ... implement all required methods
}
```

See [DateAdapter.ts](../src/adapters/DateAdapter.ts) for the complete interface.
