export function formatISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function subDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() - days);
  return next;
}

export function toDate(input?: string | null): Date | null {
  if (!input) {
    return null;
  }

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function isWithinRange(dateValue: string, start?: string | null, end?: string | null): boolean {
  const date = toDate(dateValue);
  const startDate = toDate(start);
  const endDate = toDate(end);

  if (!date) {
    return false;
  }

  if (startDate && date < startDate) {
    return false;
  }

  if (endDate && date > endDate) {
    return false;
  }

  return true;
}
