import { describe, expect, it } from 'vitest';
import { formatPrice } from '.';

describe('formatPrice', () => {
  it('formats rubles without fraction digits', () => {
    expect(formatPrice(1500).replace(/\s/g, ' ')).toBe('1 500 ₽');
  });

  it('formats zero', () => {
    expect(formatPrice(0).replace(/\s/g, ' ')).toBe('0 ₽');
  });
});
