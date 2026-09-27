import { z } from 'zod';
import { onlyDigits } from '@/utils';

const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 15;

export const clientFormSchema = z.object({
  name: z.string().trim().min(1, 'Обязательное поле'),
  phone: z.string().refine(
    (value) => {
      const digits = onlyDigits(value).length;
      return digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS;
    },
    { message: 'Некорректный телефон' },
  ),
  email: z.union([z.literal(''), z.email('Некорректный email')]),
  comment: z.string().trim(),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;
