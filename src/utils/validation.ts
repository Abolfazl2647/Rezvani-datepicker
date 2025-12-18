export function isValidDate(date: any): boolean {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }
  return false;
}

export function validateDateRange<TDate>(
  start: TDate,
  end: TDate,
  isAfter: (a: TDate, b: TDate) => boolean
): boolean {
  return isAfter(end, start);
}
