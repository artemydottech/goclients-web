import { describe, expect, it } from 'vitest';
import { timeOffFormSchema } from './time-off-form.validation';

const valid = {
  starts_on: '2026-10-10',
  ends_on: '2026-10-12',
  reason: 'Отпуск',
};

describe('timeOffFormSchema', () => {
  it('accepts a multi-day period', () => {
    expect(timeOffFormSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts a single-day period', () => {
    expect(
      timeOffFormSchema.safeParse({ ...valid, ends_on: valid.starts_on })
        .success,
    ).toBe(true);
  });

  it('rejects an end before the start', () => {
    const result = timeOffFormSchema.safeParse({
      ...valid,
      ends_on: '2026-10-09',
    });
    expect(result.error?.issues[0]).toMatchObject({
      path: ['ends_on'],
      message: 'Окончание раньше начала',
    });
  });

  it('requires dates and a reason', () => {
    const result = timeOffFormSchema.safeParse({
      starts_on: '',
      ends_on: '',
      reason: '  ',
    });
    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      'Укажите дату начала',
      'Укажите дату окончания',
      'Укажите причину',
    ]);
  });
});
