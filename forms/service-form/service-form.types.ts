import type { Control } from 'react-hook-form';
import type { ServiceFormValues } from './service-form.validation';

export interface ServiceFormProps {
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: ServiceFormValues) => void;
}

export interface ServiceFormFieldsProps {
  control: Control<ServiceFormValues>;
}
