import { z } from 'zod';

export const rescheduleFormSchema = z.object({
  employee_id: z.number().int().min(1, 'Выберите мастера'),
  date: z.iso.date('Выберите дату'),
  starts_at: z.iso.datetime({ offset: true, error: 'Выберите новое время' }),
});

export type RescheduleFormValues = z.infer<typeof rescheduleFormSchema>;
