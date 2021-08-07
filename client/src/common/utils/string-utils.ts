export function isNonWhiteSpace(value: unknown) {
  return typeof value === 'string' && value.trim() !== '';
}

export function trimToUndefined(value: string): string | undefined {
  return value.trim() === '' ? undefined : value;
}
