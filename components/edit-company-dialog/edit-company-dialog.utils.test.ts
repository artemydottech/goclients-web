import { describe, expect, it } from 'vitest';
import type { Company } from '@/types';
import type { CompanyFormValues } from '@/forms/company-form/company-form.validation';
import { toUpdateCompanyRequest } from './edit-company-dialog.utils';

const company: Company = {
  id: 4,
  name: 'Салон',
  address: '',
  geolocation: '56.8,60.6',
  schedule: '',
  logo: '',
  site: '',
  timezone: 'Asia/Yekaterinburg',
  socials: { viber: '79991234567', vk: 'old', telegram: '@old' },
};

const values: CompanyFormValues = {
  name: 'Новое название',
  address: '',
  schedule: '',
  logo: '',
  site: '',
  timezone: 'Asia/Yekaterinburg',
  telegram: '@new',
  vk: '',
  whatsapp: '79991234567',
};

describe('toUpdateCompanyRequest', () => {
  it('keeps geolocation and social networks outside the form', () => {
    const request = toUpdateCompanyRequest(company, values);
    expect(request.id).toBe(4);
    expect(request.body.geolocation).toBe(company.geolocation);
    expect(request.body.socials).toEqual({
      viber: '79991234567',
      telegram: '@new',
      whatsapp: '79991234567',
    });
    expect(request.body.name).toBe('Новое название');
    expect(company.socials?.vk).toBe('old');
  });

  it('clears contacts without sending form-only fields', () => {
    const request = toUpdateCompanyRequest(
      { ...company, socials: undefined },
      { ...values, telegram: '', whatsapp: '' },
    );
    expect(request.body.socials).toEqual({});
    expect(request.body).not.toHaveProperty('telegram');
    expect(request.body).not.toHaveProperty('vk');
    expect(request.body).not.toHaveProperty('whatsapp');
    expect(request.body).not.toHaveProperty('id');
  });
});
