import { z } from 'zod';

const MAX_DURATION_MINUTES = 1440;

export const serviceFormSchema = z.object({
  name: z.string().trim().min(1, 'Обязательное поле'),
  description: z.string().trim(),
  duration: z
    .number({ error: 'Укажите длительность' })
    .int('Только целые минуты')
    .min(1, 'Минимум 1 минута')
    .max(MAX_DURATION_MINUTES, 'Не больше суток'),
  price: z
    .number({ error: 'Укажите цену' })
    .min(0, 'Цена не может быть отрицательной'),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;
