import type { Appointment } from '@/types';
import type { RescheduleFormValues } from './reschedule-form.validation';

export interface RescheduleFormProps {
  appointment: Appointment;
  timezone: string;
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: RescheduleFormValues) => void;
  onCancel: () => void;
}
