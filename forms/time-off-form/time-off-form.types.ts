import type { Control } from 'react-hook-form';
import type { TimeOffFormValues } from './time-off-form.validation';

export interface TimeOffFormProps {
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: TimeOffFormValues) => void;
}

export interface TimeOffFormFieldsProps {
  control: Control<TimeOffFormValues>;
}
