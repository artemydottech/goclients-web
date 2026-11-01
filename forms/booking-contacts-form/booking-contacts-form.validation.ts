import { z } from 'zod';
import { boundedText } from '@/lib/validation';
import { onlyDigits } from '@/utils';

const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 15;

export const bookingContactsFormSchema = z.object({
  name: boundedText(200).min(1, 'Как к вам обращаться?'),
  phone: z.string().refine(
    (value) => {
      const digits = onlyDigits(value).length;
      return digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS;
    },
    { message: 'Проверьте номер телефона' },
  ),
  comment: boundedText(1000),
});

export type BookingContactsFormValues = z.infer<
  typeof bookingContactsFormSchema
>;
