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
  isToday: boolean;
  onSelect: (appointmentId: number) => void;
}

export interface AppointmentBlockProps {
  appointment: Appointment;
  directory: CompanyDirectory;
  timezone: string;
  onSelect: (appointmentId: number) => void;
}

export interface WeekViewProps extends Omit<DayViewProps, 'isToday'> {
  companyId: number;
  weekStart: string;
  today: string;
}

export interface CurrentTimeLineProps {
  timezone: string;
  withDot: boolean;
}
