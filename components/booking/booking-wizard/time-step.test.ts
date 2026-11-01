import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, expect, it, vi } from 'vitest';
import { TimeStep } from './time-step';

vi.mock('@/services/queries/slots', () => ({
  useGetSlotsByDates: () =>
    new Map([
      ['2026-11-01', false],
      ['2026-11-02', true],
    ]),
  useGetSlots: () => ({
    data: [],
    isPending: false,
    isFetching: false,
    error: null,
  }),
}));
afterEach(() => vi.useRealTimers());
it('disables dates with no availability while leaving free dates selectable', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-11-01T12:00:00Z'));
  const noop = () => {};
  const html = renderToStaticMarkup(
    createElement(TimeStep, {
      serviceId: 1,
      employeeId: 1,
      timezone: 'UTC',
      date: '2026-11-01',
      slot: '',
      onDateChange: noop,
      onSlotChange: noop,
      onBack: noop,
      onNext: noop,
    }),
  );
  const radios = [...html.matchAll(/<button\b[^>]*role="radio"[^>]*>/g)].map(
    (match) => match[0],
  );
  expect(radios[0]).toContain('disabled=""');
  expect(radios[1]).not.toContain('disabled=""');
});
