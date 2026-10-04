import { describe, expect, it } from 'vitest';
import { parseDateParam, toCompanyDateTime } from './date';

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

describe('toCompanyDateTime', () => {
  it('applies the company timezone offset', () => {
    expect(toCompanyDateTime('2026-10-05', '10:00', 'Europe/Moscow')).toBe(
      '2026-10-05T10:00:00+03:00',
    );
    expect(
      toCompanyDateTime('2026-10-05', '10:00', 'Asia/Yekaterinburg'),
    ).toBe('2026-10-05T10:00:00+05:00');
  });

  it('falls back to UTC for an empty timezone', () => {
    expect(toCompanyDateTime('2026-10-05', '10:00', '')).toBe(
      '2026-10-05T10:00:00+00:00',
    );
  });
});
