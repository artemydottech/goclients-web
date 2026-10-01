import { z } from 'zod';

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const time = z.string().regex(TIME_PATTERN, 'Формат ЧЧ:ММ');

const scheduleDaySchema = z
  .object({
    weekday: z.number().int().min(0).max(6),
    isWorking: z.boolean(),
    starts_at: time,
    ends_at: time,
    hasBreak: z.boolean(),
    break_starts_at: time,
    break_ends_at: time,
  })
  .superRefine((day, ctx) => {
    if (!day.isWorking) return;
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
  days: z.array(scheduleDaySchema),
});

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

export type ScheduleDayValues = ScheduleFormValues['days'][number];
