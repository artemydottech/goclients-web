import { it, expect, vi } from 'vitest';
import { requireRouteId } from './route-id';

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('not found');
  },
}));
it('accepts positive safe route identifiers', () => {
  expect(requireRouteId('7')).toBe(7);
  expect(requireRouteId('9007199254740991')).toBe(Number.MAX_SAFE_INTEGER);
});
it.each([
  '',
  '0',
  '-1',
  '1.5',
  '1e2',
  '0x10',
  ' 1',
  '+1',
  '01',
  'abc',
  '9007199254740992',
])('rejects invalid route identifiers %s', (value) => {
  expect(() => requireRouteId(value)).toThrow('not found');
});
