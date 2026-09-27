import { z } from 'zod';

const optionalUrl = z.union([z.literal(''), z.url('Некорректная ссылка')]);

export const companyFormSchema = z.object({
  name: z.string().trim().min(1, 'Обязательное поле'),
  address: z.string().trim(),
  schedule: z.string().trim(),
  timezone: z.string().min(1, 'Выберите часовой пояс'),
  site: optionalUrl,
  logo: optionalUrl,
  telegram: z.string().trim(),
  vk: z.string().trim(),
  whatsapp: z.string().trim(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
