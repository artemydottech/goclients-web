import { z } from 'zod';

export const timeOffFormSchema = z
  .object({
    starts_on: z.string().min(1, 'Укажите дату начала'),
    ends_on: z.string().min(1, 'Укажите дату окончания'),
    reason: z.string().trim().min(1, 'Укажите причину'),
  })
  .refine(({ starts_on, ends_on }) => ends_on >= starts_on, {
    path: ['ends_on'],
    message: 'Окончание раньше начала',
  });

export type TimeOffFormValues = z.infer<typeof timeOffFormSchema>;
