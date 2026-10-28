import { z } from 'zod';
import { boundedText } from '@/lib/validation';
import { onlyDigits } from '@/utils';

const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 15;

export const clientFormSchema = z.object({
  name: boundedText(200).min(1, 'Обязательное поле'),
  phone: z.string().refine(
    (value) => {
      const digits = onlyDigits(value).length;
      return digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS;
    },
    { message: 'Некорректный телефон' },
  ),
  email: boundedText(254).pipe(
    z.union([z.literal(''), z.email('Некорректный email')]),
  ),
  comment: boundedText(1000),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;
