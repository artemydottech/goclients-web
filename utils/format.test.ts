import { describe, expect, it } from 'vitest';
import { formatPrice, truncate } from '.';

describe('formatPrice', () => {
  it('formats rubles without fraction digits', () => {
    expect(formatPrice(1500).replace(/\s/g, ' ')).toBe('1 500 ₽');
  });

  it('formats zero', () => {
    expect(formatPrice(0).replace(/\s/g, ' ')).toBe('0 ₽');
  });
});

describe('truncate', () => {
  it('returns empty string for empty input', () => {
    expect(truncate('', 5)).toBe('');
  });

  it('keeps strings within the limit', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });

  it('cuts long strings and appends ellipsis within the limit', () => {
    expect(truncate('hello world', 6)).toBe('hello…');
  });

  it('supports custom ellipsis', () => {
    expect(truncate('hello world', 8, '...')).toBe('hello...');
  });
});
