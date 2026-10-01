import { z } from 'zod';

export const employeeFormSchema = z.object({
  name: z.string().trim().min(1, 'Обязательное поле'),
  surname: z.string().trim(),
  position: z.string().trim(),
  avatar: z.union([z.literal(''), z.url('Некорректная ссылка')]),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
