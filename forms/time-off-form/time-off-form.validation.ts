import { z } from 'zod';
import { boundedText } from '@/lib/validation';

export const timeOffFormSchema = z
  .object({
    starts_on: z.iso.date('Укажите дату начала'),
    ends_on: z.iso.date('Укажите дату окончания'),
    reason: boundedText(200).min(1, 'Укажите причину'),
  })
  .refine(({ starts_on, ends_on }) => ends_on >= starts_on, {
    path: ['ends_on'],
    message: 'Окончание раньше начала',
  });

export type TimeOffFormValues = z.infer<typeof timeOffFormSchema>;
