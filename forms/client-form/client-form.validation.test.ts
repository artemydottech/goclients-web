import { describe, expect, it } from 'vitest';
import { clientFormSchema } from './client-form.validation';

const valid = {
  name: 'Анна',
  phone: '+7 900 123-45-67',
  email: '',
  comment: '',
};

const firstMessage = (values: typeof valid) =>
  clientFormSchema.safeParse(values).error?.issues[0].message;

describe('clientFormSchema', () => {
  it('accepts a client without email', () => {
    expect(clientFormSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts a valid email', () => {
    expect(
      clientFormSchema.safeParse({ ...valid, email: 'anna@example.com' })
        .success,
    ).toBe(true);
  });

  it('rejects an invalid email', () => {
    expect(firstMessage({ ...valid, email: 'anna@' })).toBe(
      'Некорректный email',
    );
  });

  it('requires a name', () => {
    expect(firstMessage({ ...valid, name: ' ' })).toBe('Обязательное поле');
  });

  it('rejects a short phone', () => {
    expect(firstMessage({ ...valid, phone: '12345' })).toBe(
      'Некорректный телефон',
    );
  });
});
