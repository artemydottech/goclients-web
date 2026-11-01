import { expect, it } from 'vitest';
import { nextSlotIndex } from './slot-picker.utils';
it.each([
  ['ArrowRight', 2, 3, 0],
  ['ArrowDown', 0, 3, 1],
  ['ArrowLeft', 0, 3, 2],
  ['ArrowUp', 1, 3, 0],
  ['Home', 2, 3, 0],
  ['End', 0, 3, 2],
  ['Enter', 0, 3, null],
  ['ArrowRight', 0, 0, null],
] as const)('moves focus for %s', (key, index, length, expected) => {
  expect(nextSlotIndex(key, index, length)).toBe(expected);
});
