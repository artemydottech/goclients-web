import type { Control, UseFormSetValue } from 'react-hook-form';
import type { Client, Service } from '@/types';
import type { AppointmentFormValues } from './appointment-form.validation';

export interface AppointmentFormProps {
  clients: Client[];
  services: Service[];
  timezone: string;
  defaultDate: string;
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: AppointmentFormValues) => void;
}

export interface AppointmentFormFieldsProps {
  control: Control<AppointmentFormValues>;
  setValue: UseFormSetValue<AppointmentFormValues>;
  clients: Client[];
  services: Service[];
  timezone: string;
}
