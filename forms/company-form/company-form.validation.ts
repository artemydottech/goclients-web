import { z } from 'zod';

import { boundedText, optionalWebUrl } from '@/lib/validation';

export const companyFormSchema = z.object({
  name: boundedText(200).min(1, 'Обязательное поле'),
  address: boundedText(500),
  schedule: boundedText(1000),
  timezone: z.string().min(1, 'Выберите часовой пояс'),
  site: optionalWebUrl,
  logo: optionalWebUrl,
  telegram: boundedText(500),
  vk: boundedText(500),
  whatsapp: boundedText(500),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
