import { describe, expect, it } from 'vitest';
import { rescheduleFormSchema } from './reschedule-form.validation';

const valid = {
  employee_id: 3,
  date: '2026-10-07',
  starts_at: '2026-10-07T10:00:00+05:00',
};

describe('rescheduleFormSchema', () => {
  it('accepts a complete form', () => {
    expect(rescheduleFormSchema.safeParse(valid).success).toBe(true);
  });

  it('requires an employee, a date and a slot', () => {
    const result = rescheduleFormSchema.safeParse({
      employee_id: 0,
      date: '',
      starts_at: '',
    });
    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      'Выберите мастера',
      'Выберите дату',
      'Выберите новое время',
    ]);
  });

  it('rejects a fractional employee id', () => {
    expect(
      rescheduleFormSchema.safeParse({ ...valid, employee_id: 1.5 }).success,
    ).toBe(false);
  });
});

it.each(['2026-02-30', '2026-13-01', '2026-2-01', 'bad'])(
  'rejects invalid date %s',
  (date) => {
    expect(rescheduleFormSchema.safeParse({ ...valid, date }).success).toBe(
      false,
    );
  },
);
it('rejects an invalid slot timestamp', () => {
  expect(
    rescheduleFormSchema.safeParse({ ...valid, starts_at: '10:00' }).success,
  ).toBe(false);
});
