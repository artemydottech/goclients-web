import { describe, expect, it } from 'vitest';
import { employeeFormSchema } from './employee-form.validation';

const valid = { name: 'Анна', surname: 'Иванова', position: '', avatar: '' };

describe('employeeFormSchema', () => {
  it('accepts the required name and surname', () => {
    expect(employeeFormSchema.safeParse(valid).success).toBe(true);
  });

  it('requires a name', () => {
    const result = employeeFormSchema.safeParse({ ...valid, name: '  ' });
    expect(result.error?.issues[0].message).toBe('Обязательное поле');
  });

  it('requires a surname to match backend validation', () => {
    const result = employeeFormSchema.safeParse({ ...valid, surname: '  ' });
    expect(result.error?.issues[0].path).toEqual(['surname']);
    expect(result.error?.issues[0].message).toBe('Обязательное поле');
  });

  it('validates the avatar link', () => {
    expect(
      employeeFormSchema.safeParse({
        ...valid,
        avatar: 'https://example.com/a.png',
      }).success,
    ).toBe(true);
    const result = employeeFormSchema.safeParse({ ...valid, avatar: 'a.png' });
    expect(result.error?.issues[0].message).toBe('Некорректная ссылка');
  });
});

it.each(['name', 'surname', 'position'])(
  'rejects oversized employee %s',
  (field) => {
    const limit = field === 'position' ? 500 : 200;
    expect(
      employeeFormSchema.safeParse({ ...valid, [field]: 'я'.repeat(limit + 1) })
        .success,
    ).toBe(false);
    expect(
      employeeFormSchema.safeParse({ ...valid, [field]: '😀'.repeat(limit) })
        .success,
    ).toBe(true);
  },
);
it('rejects non-web avatar protocols', () => {
  expect(
    employeeFormSchema.safeParse({ ...valid, avatar: 'file:///tmp/photo' })
      .success,
  ).toBe(false);
});
