'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ErrorText } from '@/components/shared/error-text';
import {
  companyFormSchema,
  type CompanyFormValues,
} from './company-form.validation';
import { DEFAULT_COMPANY_TIMEZONE } from './company-form.constants';
import CompanyFormFields from './company-form.fields';
import type { CompanyFormProps } from './company-form.types';

const DEFAULT_VALUES: CompanyFormValues = {
  name: '',
  address: '',
  schedule: '',
  timezone: DEFAULT_COMPANY_TIMEZONE,
  site: '',
  logo: '',
  telegram: '',
  vk: '',
  whatsapp: '',
};

export const CompanyForm = ({
  isPending,
  errorMessage,
  onSubmit,
}: CompanyFormProps) => {
  const { control, handleSubmit } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <CompanyFormFields control={control} />
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
      <Button type="submit" disabled={isPending}>
        Создать компанию
      </Button>
    </form>
  );
};
