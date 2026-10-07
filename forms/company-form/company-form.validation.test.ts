import { describe, expect, it } from 'vitest';
import { companyFormSchema } from './company-form.validation';

const valid = {
  name: 'Салон',
  address: '',
  schedule: '',
  timezone: 'Europe/Moscow',
  site: '',
  logo: '',
  telegram: '',
  vk: '',
  whatsapp: '',
};

const firstMessage = (values: Partial<typeof valid>) =>
  companyFormSchema.safeParse({ ...valid, ...values }).error?.issues[0].message;

describe('companyFormSchema', () => {
  it('accepts a minimal company', () => {
    expect(companyFormSchema.safeParse(valid).success).toBe(true);
  });

  it('requires a name and a timezone', () => {
    expect(firstMessage({ name: ' ' })).toBe('Обязательное поле');
    expect(firstMessage({ timezone: '' })).toBe('Выберите часовой пояс');
  });

  it('accepts empty or valid site and logo links', () => {
    expect(
      companyFormSchema.safeParse({
        ...valid,
        site: 'https://salon.example',
        logo: 'https://salon.example/logo.png',
      }).success,
    ).toBe(true);
  });

  it('rejects invalid site and logo links', () => {
    expect(firstMessage({ site: 'salon' })).toBe('Некорректная ссылка');
    expect(firstMessage({ logo: 'not a url' })).toBe('Некорректная ссылка');
  });
});
