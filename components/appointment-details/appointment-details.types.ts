import type { Appointment } from '@/types';
import type { CompanyDirectory } from '@/hooks/use-company-directory';

export interface AppointmentDetailsProps {
  companyId: number;
  appointment: Nullable<Appointment>;
  directory: CompanyDirectory;
  timezone: string;
  onClose: () => void;
}

export interface AppointmentStatusActionsProps {
  appointment: Appointment;
}
