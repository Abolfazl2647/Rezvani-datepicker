# Rezvani DatePicker

A tree-shakeable, adapter-based React datepicker library with support for multiple date libraries.

## Features

- 🎯 **Tree-Shakeable** - Only import what you need
- 🔌 **Adapter Pattern** - Use your preferred date library (Native Date, dayjs, date-fns)
- ♿ **Accessible** - Built with accessibility in mind
- 🎨 **Customizable** - Easy to style and extend
- 📱 **Responsive** - Mobile-friendly out of the box
- 🧪 **Well Tested** - Comprehensive test coverage

## Installation

```bash
npm install rezvani-datepicker
```

## Quick Start

### Using Native Date

```typescript
import { DatePicker, NativeDateAdapter } from "rezvani-datepicker";
import "rezvani-datepicker/styles";

const adapter = new NativeDateAdapter();

function App() {
  const [date, setDate] = React.useState<Date | null>(null);

  return <DatePicker value={date} onChange={setDate} adapter={adapter} />;
}
```

### Using Dayjs

```typescript
import { DatePicker, DayjsAdapter } from "rezvani-datepicker/adapters/dayjs";
import dayjs from "dayjs";

const adapter = new DayjsAdapter(dayjs);

function App() {
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);

  return <DatePicker value={date} onChange={setDate} adapter={adapter} />;
}
```

### Using date-fns

```typescript
import {
  DatePicker,
  DateFnsAdapter,
} from "rezvani-datepicker/adapters/date-fns";

const adapter = new DateFnsAdapter();

function App() {
  const [date, setDate] = React.useState<Date | null>(null);

  return <DatePicker value={date} onChange={setDate} adapter={adapter} />;
}
```

## API

See [API documentation](docs/API.md) for detailed component and hook documentation.

## Development

```bash
npm install
npm run dev        # Start dev server
npm run build      # Build library
npm test           # Run tests
npm run lint       # Run linter
```

## License

MIT
