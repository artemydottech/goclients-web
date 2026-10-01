'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ErrorText } from '@/components/shared/error-text';
import {
  employeeFormSchema,
  type EmployeeFormValues,
} from './employee-form.validation';
import EmployeeFormFields from './employee-form.fields';
import type { EmployeeFormProps } from './employee-form.types';

const DEFAULT_VALUES: EmployeeFormValues = {
  name: '',
  surname: '',
  position: '',
  avatar: '',
};

export const EmployeeForm = ({
  isPending,
  errorMessage,
  onSubmit,
}: EmployeeFormProps) => {
  const { control, handleSubmit } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <EmployeeFormFields control={control} />
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
      <Button type="submit" disabled={isPending}>
        Сохранить
      </Button>
    </form>
  );
};
