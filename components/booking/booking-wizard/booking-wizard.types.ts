import type { Company, Employee, Service } from '@/types';

export type BookingStep = 'service' | 'employee';

export interface BookingSelection {
  service: Nullable<Service>;
  employee: Nullable<Employee>;
}

export interface BookingWizardProps {
  companyId: number;
}

export interface StepIndicatorProps {
  current: BookingStep;
}

export interface ServiceStepProps {
  companyId: number;
  selectedId?: number;
  onSelect: (service: Service) => void;
}

export interface EmployeeStepProps {
  serviceId: number;
  selectedId?: number;
  onSelect: (employee: Employee) => void;
  onBack: () => void;
}

export interface BookingSummaryProps {
  company?: Company;
  selection: BookingSelection;
}

export interface OptionCardProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
