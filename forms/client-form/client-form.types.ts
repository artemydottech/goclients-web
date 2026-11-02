import type { Control } from 'react-hook-form';
import type { ClientFormValues } from './client-form.validation';

export interface ClientFormProps {
  defaultValues?: Partial<ClientFormValues>;
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: ClientFormValues) => void;
}

export interface ClientFormFieldsProps {
  control: Control<ClientFormValues>;
}
