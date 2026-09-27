'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ErrorText } from '@/components/shared/error-text';
import {
  serviceFormSchema,
  type ServiceFormValues,
} from './service-form.validation';
import ServiceFormFields from './service-form.fields';
import type { ServiceFormProps } from './service-form.types';

const DEFAULT_VALUES: ServiceFormValues = {
  name: '',
  description: '',
  duration: 60,
  price: 1000,
};

export const ServiceForm = ({
  isPending,
  errorMessage,
  onSubmit,
}: ServiceFormProps) => {
  const { control, handleSubmit } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <ServiceFormFields control={control} />
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
      <Button type="submit" disabled={isPending}>
        Сохранить
      </Button>
    </form>
  );
};
