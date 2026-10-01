import { z } from 'zod';
import { onlyDigits } from '@/utils';

const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 15;

export const bookingContactsFormSchema = z.object({
  name: z.string().trim().min(1, 'Как к вам обращаться?'),
  phone: z.string().refine(
    (value) => {
      const digits = onlyDigits(value).length;
      return digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS;
    },
    { message: 'Проверьте номер телефона' },
  ),
  comment: z.string().trim(),
});

export type BookingContactsFormValues = z.infer<
  typeof bookingContactsFormSchema
>;
