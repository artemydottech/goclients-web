import { z } from 'zod';

export const rescheduleFormSchema = z.object({
  employee_id: z.number().int().min(1, 'Выберите мастера'),
  date: z.string().min(1, 'Выберите дату'),
  starts_at: z.string().min(1, 'Выберите новое время'),
});

export type RescheduleFormValues = z.infer<typeof rescheduleFormSchema>;
