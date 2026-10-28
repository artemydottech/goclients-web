import { z } from 'zod';
import { boundedText, optionalWebUrl } from '@/lib/validation';

export const employeeFormSchema = z.object({
  name: boundedText(200).min(1, 'Обязательное поле'),
  surname: boundedText(200).min(1, 'Обязательное поле'),
  position: boundedText(500),
  avatar: optionalWebUrl,
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
