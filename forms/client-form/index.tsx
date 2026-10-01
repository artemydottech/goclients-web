'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ErrorText } from '@/components/shared/error-text';
import {
  clientFormSchema,
  type ClientFormValues,
} from './client-form.validation';
import ClientFormFields from './client-form.fields';
import type { ClientFormProps } from './client-form.types';

const DEFAULT_VALUES: ClientFormValues = {
  name: '',
  phone: '',
  email: '',
  comment: '',
};

export const ClientForm = ({
  isPending,
  errorMessage,
  onSubmit,
}: ClientFormProps) => {
  const { control, handleSubmit } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <ClientFormFields control={control} />
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
      <Button type="submit" disabled={isPending}>
        Сохранить
      </Button>
    </form>
  );
};
