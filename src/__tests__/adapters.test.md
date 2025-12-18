# Testing

Basic test file templates for the datepicker library.

```typescript
import { describe, it, expect } from 'vitest';
import { NativeDateAdapter } from '@/adapters/native';

describe('NativeDateAdapter', () => {
  const adapter = new NativeDateAdapter();

  it('should create a date from value', () => {
    const date = adapter.date('2024-01-15');
    expect(date).toBeInstanceOf(Date);
  });

  it('should compare dates correctly', () => {
    const date1 = new Date('2024-01-15');
    const date2 = new Date('2024-01-20');

    expect(adapter.isBefore(date1, date2)).toBe(true);
    expect(adapter.isAfter(date2, date1)).toBe(true);
    expect(adapter.isEqual(date1, date1)).toBe(true);
  });

  it('should add days correctly', () => {
    const date = new Date('2024-01-15');
    const newDate = adapter.addDays(date, 5);

    expect(newDate.getDate()).toBe(20);
  });
});
```

## Running Tests

```bash
npm test                # Run all tests
npm run test:coverage   # Run with coverage report
npm test -- --watch    # Watch mode
```
