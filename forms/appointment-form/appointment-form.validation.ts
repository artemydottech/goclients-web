import { z } from 'zod';
import { boundedText } from '@/lib/validation';

export const appointmentFormSchema = z.object({
  client_id: z.number().int().min(1, 'Выберите клиента'),
  service_id: z.number().int().min(1, 'Выберите услугу'),
  employee_id: z.number().int().min(1, 'Выберите мастера'),
  date: z.iso.date('Выберите дату'),
  starts_at: z.iso.datetime({ offset: true, error: 'Выберите время' }),
  comment: boundedText(1000),
  isConfirmed: z.boolean(),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;
