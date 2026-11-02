import type { Company, SocialNetwork, Socials } from '@/types';
import type { CompanyFormValues } from '@/forms/company-form/company-form.validation';
import type { UpdateCompanyRequest } from '@/services/api/companies/companies.types';

export const toUpdateCompanyRequest = (
  company: Company,
  { telegram, vk, whatsapp, ...values }: CompanyFormValues,
): UpdateCompanyRequest => {
  const socials: Socials = { ...company.socials };
  const entries: [SocialNetwork, string][] = [
    ['telegram', telegram],
    ['vk', vk],
    ['whatsapp', whatsapp],
  ];

  for (const [network, value] of entries) {
    if (value) socials[network] = value;
    else delete socials[network];
  }

  return {
    id: company.id,
    body: { ...values, geolocation: company.geolocation, socials },
  };
};
