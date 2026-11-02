import type { Control } from 'react-hook-form';
import type { EmployeeFormValues } from './employee-form.validation';

export interface EmployeeFormProps {
  defaultValues?: Partial<EmployeeFormValues>;
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: EmployeeFormValues) => void;
}

export interface EmployeeFormFieldsProps {
  control: Control<EmployeeFormValues>;
}
