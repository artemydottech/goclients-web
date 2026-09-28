import type { Appointment } from '@/types';
import type { CompanyDirectory } from '@/hooks/use-company-directory';

export type CalendarView = 'day' | 'week';

export interface AppointmentsCalendarProps {
  companyId: number;
  date: Nullable<string>;
  view: CalendarView;
}

export interface CalendarToolbarProps {
  companyId: number;
  date: string;
  today: string;
  view: CalendarView;
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

export interface WeekViewProps extends DayViewProps {
  companyId: number;
  weekStart: string;
  today: string;
}
