import type { Control } from 'react-hook-form';
import type { CompanyFormValues } from './company-form.validation';

export interface CompanyFormProps {
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: CompanyFormValues) => void;
}

export interface CompanyFormFieldsProps {
  control: Control<CompanyFormValues>;
}
