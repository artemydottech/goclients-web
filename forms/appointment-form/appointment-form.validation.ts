import { z } from 'zod';

export const appointmentFormSchema = z.object({
  client_id: z.number().int().min(1, 'Выберите клиента'),
  service_id: z.number().int().min(1, 'Выберите услугу'),
  employee_id: z.number().int().min(1, 'Выберите мастера'),
  date: z.string().min(1, 'Выберите дату'),
  starts_at: z.string().min(1, 'Выберите время'),
  comment: z.string().trim(),
  isConfirmed: z.boolean(),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;
