import type { Control } from 'react-hook-form';
import type { ClientFormValues } from './client-form.validation';

export interface ClientFormProps {
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: ClientFormValues) => void;
}

export interface ClientFormFieldsProps {
  control: Control<ClientFormValues>;
}
