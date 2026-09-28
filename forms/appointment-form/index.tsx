'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ErrorText } from '@/components/shared/error-text';
import {
  appointmentFormSchema,
  type AppointmentFormValues,
} from './appointment-form.validation';
import AppointmentFormFields from './appointment-form.fields';
import type { AppointmentFormProps } from './appointment-form.types';

export const AppointmentForm = ({
  clients,
  services,
  timezone,
  defaultDate,
  isPending,
  errorMessage,
  onSubmit,
}: AppointmentFormProps) => {
  const { control, handleSubmit, setValue } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      client_id: 0,
      service_id: 0,
      employee_id: 0,
      date: defaultDate,
      starts_at: '',
      comment: '',
      isConfirmed: true,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <AppointmentFormFields
        control={control}
        setValue={setValue}
        clients={clients}
        services={services}
        timezone={timezone}
      />
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
      <Button type="submit" disabled={isPending}>
        Записать
      </Button>
    </form>
  );
};
