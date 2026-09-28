import type { Appointment } from '@/types';
import type { CompanyDirectory } from '@/hooks/use-company-directory';

export interface AppointmentsCalendarProps {
  companyId: number;
  date: Nullable<string>;
}

export interface CalendarToolbarProps {
  companyId: number;
  date: string;
  today: string;
}

export interface DayViewProps {
  appointments: Appointment[];
  directory: CompanyDirectory;
  timezone: string;
}

export interface AppointmentBlockProps {
  appointment: Appointment;
  directory: CompanyDirectory;
  timezone: string;
}
