'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ErrorText } from '@/components/shared/error-text';
import type { WorkingDayInput } from '@/services/api/schedule/schedule.types';
import type { WorkingDay } from '@/types';
import {
  scheduleFormSchema,
  type ScheduleDayValues,
  type ScheduleFormValues,
} from './schedule-form.validation';
import { DEFAULT_DAY, WEEKDAY_ORDER } from './schedule-form.constants';
import ScheduleFormFields from './schedule-form.fields';
import type { ScheduleFormProps } from './schedule-form.types';

const toFormValues = (schedule: WorkingDay[]): ScheduleFormValues => ({
  days: WEEKDAY_ORDER.map((weekday) => {
    const day = schedule.find((item) => item.weekday === weekday);
    return {
      weekday,
      isWorking: Boolean(day),
      starts_at: day?.starts_at ?? DEFAULT_DAY.starts_at,
      ends_at: day?.ends_at ?? DEFAULT_DAY.ends_at,
      hasBreak: Boolean(day?.break_starts_at),
      break_starts_at: day?.break_starts_at || DEFAULT_DAY.break_starts_at,
      break_ends_at: day?.break_ends_at || DEFAULT_DAY.break_ends_at,
    };
  }),
});

const toWorkingDay = (day: ScheduleDayValues): WorkingDayInput => ({
  weekday: day.weekday,
  starts_at: day.starts_at,
  ends_at: day.ends_at,
  ...(day.hasBreak && {
    break_starts_at: day.break_starts_at,
    break_ends_at: day.break_ends_at,
  }),
});

export const ScheduleForm = ({
  schedule,
  isPending,
  errorMessage,
  onSubmit,
}: ScheduleFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: toFormValues(schedule),
  });

  const submit = (values: ScheduleFormValues) =>
    onSubmit(values.days.filter((day) => day.isWorking).map(toWorkingDay));

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <ScheduleFormFields
        control={control}
        register={register}
        errors={errors}
      />
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
      <Button type="submit" disabled={isPending || !isDirty}>
        Сохранить график
      </Button>
    </form>
  );
};
