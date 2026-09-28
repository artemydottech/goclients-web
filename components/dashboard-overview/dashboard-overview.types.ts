import type { Appointment } from '@/types';
import type { CompanyDirectory } from '@/hooks/use-company-directory';

export interface DashboardOverviewProps {
  companyId: number;
}

export interface OverviewSectionProps {
  companyId: number;
  appointments: Appointment[];
  directory: CompanyDirectory;
  timezone: string;
}

export interface MetricCardProps {
  label: string;
  value: string;
  hint: string;
}
