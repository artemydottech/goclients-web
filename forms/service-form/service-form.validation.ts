import { z } from 'zod';
import { boundedText } from '@/lib/validation';

const MAX_DURATION_MINUTES = 1440;

export const serviceFormSchema = z.object({
  name: boundedText(200).min(1, 'Обязательное поле'),
  description: boundedText(500),
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
