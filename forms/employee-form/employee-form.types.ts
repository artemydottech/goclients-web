import type { Control } from 'react-hook-form';
import type { EmployeeFormValues } from './employee-form.validation';

export interface EmployeeFormProps {
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: EmployeeFormValues) => void;
}

export interface EmployeeFormFieldsProps {
  control: Control<EmployeeFormValues>;
}
