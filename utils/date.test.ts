import { describe, expect, it } from 'vitest';
import { parseDateParam } from './date';

describe('parseDateParam', () => {
  it('accepts a date key', () => {
    expect(parseDateParam('2026-10-05')).toBe('2026-10-05');
  });

  it('returns null for missing value', () => {
    expect(parseDateParam()).toBeNull();
    expect(parseDateParam('')).toBeNull();
  });

  it('returns null for malformed values', () => {
    expect(parseDateParam('05.10.2026')).toBeNull();
    expect(parseDateParam('2026-10-5')).toBeNull();
    expect(parseDateParam('2026-10-05T10:00')).toBeNull();
  });
});
