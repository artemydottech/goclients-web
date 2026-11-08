import { it, expect } from 'vitest';
import { getReportPeriods } from './report-periods';
it('uses company local midnight for report ranges', () => {
  const p = getReportPeriods('Asia/Yekaterinburg', '2026-11-08T20:00:00Z');
  expect(p.daily.from).toBe('2026-11-09T00:00:00+05:00');
  expect(p.weekly.from).toBe('2026-11-03T00:00:00+05:00');
});
it.each([
  ['2026-03-08T12:00:00Z', 23],
  ['2026-11-01T12:00:00Z', 25],
])('adjusts the UTC duration across daylight saving: %s', (at, hours) => {
  const p = getReportPeriods('America/New_York', at);
  expect((Date.parse(p.daily.to) - Date.parse(p.daily.from)) / 3600000).toBe(
    hours,
  );
});
