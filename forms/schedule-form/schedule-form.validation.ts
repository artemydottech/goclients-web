import { z } from 'zod';

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const scheduleDaySchema = z
  .object({
    weekday: z.number().int().min(0).max(6),
    isWorking: z.boolean(),
    starts_at: z.string(),
    ends_at: z.string(),
    hasBreak: z.boolean(),
    break_starts_at: z.string(),
    break_ends_at: z.string(),
  })
  .superRefine((day, ctx) => {
    if (!day.isWorking) return;
    const fields = [
      'starts_at',
      'ends_at',
      ...(day.hasBreak ? ['break_starts_at', 'break_ends_at'] : []),
    ] as const;
    let invalid = false;
    for (const field of fields) {
      if (!TIME_PATTERN.test(day[field as keyof typeof day] as string)) {
        invalid = true;
        ctx.addIssue({
          code: 'custom',
          path: [field],
          message: 'Формат ЧЧ:ММ',
        });
      }
    }
    if (invalid) return;
    if (day.ends_at <= day.starts_at) {
      ctx.addIssue({
        code: 'custom',
        path: ['ends_at'],
        message: 'Конец дня раньше начала',
      });
    }
    if (!day.hasBreak) return;
    if (day.break_ends_at <= day.break_starts_at) {
      ctx.addIssue({
        code: 'custom',
        path: ['break_ends_at'],
        message: 'Перерыв заканчивается раньше, чем начался',
      });
    }
    if (
      day.break_starts_at < day.starts_at ||
      day.break_ends_at > day.ends_at
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['break_starts_at'],
        message: 'Перерыв должен быть внутри рабочего дня',
      });
    }
  });

export const scheduleFormSchema = z.object({
  days: z
    .array(scheduleDaySchema)
    .max(7, 'Не больше семи дней')
    .refine(
      (days) => new Set(days.map((day) => day.weekday)).size === days.length,
      'День недели указан дважды',
    ),
});

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

export type ScheduleDayValues = ScheduleFormValues['days'][number];
