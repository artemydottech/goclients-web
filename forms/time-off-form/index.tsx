'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ErrorText } from '@/components/shared/error-text';
import {
  timeOffFormSchema,
  type TimeOffFormValues,
} from './time-off-form.validation';
import TimeOffFormFields from './time-off-form.fields';
import type { TimeOffFormProps } from './time-off-form.types';

const DEFAULT_VALUES: TimeOffFormValues = {
  starts_on: '',
  ends_on: '',
  reason: '',
};

export const TimeOffForm = ({
  isPending,
  errorMessage,
  onSubmit,
}: TimeOffFormProps) => {
  const { control, handleSubmit } = useForm<TimeOffFormValues>({
    resolver: zodResolver(timeOffFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <TimeOffFormFields control={control} />
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
      <Button type="submit" disabled={isPending}>
        Добавить
      </Button>
    </form>
  );
};
