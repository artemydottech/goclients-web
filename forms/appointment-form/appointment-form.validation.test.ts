import { describe, expect, it } from 'vitest';
import { appointmentFormSchema } from './appointment-form.validation';

const valid = {
  client_id: 1,
  service_id: 2,
  employee_id: 3,
  date: '2026-10-07',
  starts_at: '2026-10-07T10:00:00+05:00',
  comment: '',
  isConfirmed: false,
};

describe('appointmentFormSchema', () => {
  it('accepts a complete form', () => {
    expect(appointmentFormSchema.safeParse(valid).success).toBe(true);
  });

  it('asks to pick every missing field', () => {
    const result = appointmentFormSchema.safeParse({
      ...valid,
      client_id: 0,
      service_id: 0,
      employee_id: 0,
      date: '',
      starts_at: '',
    });
    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      'Выберите клиента',
      'Выберите услугу',
      'Выберите мастера',
      'Выберите дату',
      'Выберите время',
    ]);
  });

  it('trims the comment', () => {
    expect(
      appointmentFormSchema.parse({ ...valid, comment: '  аллергия ' }).comment,
    ).toBe('аллергия');
  });
});

it.each(['2026-02-30', '2026-13-01', '2026-2-01', 'bad'])(
  'rejects invalid date %s',
  (date) => {
    expect(appointmentFormSchema.safeParse({ ...valid, date }).success).toBe(
      false,
    );
  },
);
it('rejects an invalid slot timestamp', () => {
  expect(
    appointmentFormSchema.safeParse({ ...valid, starts_at: '10:00' }).success,
  ).toBe(false);
});

it('rejects oversized booking comments', () => {
  expect(
    appointmentFormSchema.safeParse({ ...valid, comment: 'я'.repeat(1001) })
      .success,
  ).toBe(false);
});
