import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { WorkingDayInput } from '@/services/api/schedule/schedule.types';
import type { WorkingDay } from '@/types';
import type { ScheduleFormValues } from './schedule-form.validation';

export interface ScheduleFormProps {
  schedule: WorkingDay[];
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (days: WorkingDayInput[]) => void;
}

export interface ScheduleFormFieldsProps {
  control: Control<ScheduleFormValues>;
  register: UseFormRegister<ScheduleFormValues>;
  errors: FieldErrors<ScheduleFormValues>;
}
