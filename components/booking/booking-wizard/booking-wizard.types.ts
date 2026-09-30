import type { Company, Employee, Service } from '@/types';

export type BookingStep = 'service' | 'employee' | 'time' | 'contacts';

export interface BookingSelection {
  service: Nullable<Service>;
  employee: Nullable<Employee>;
  date: string;
  slot: string;
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
  timezone: string;
}

export interface TimeStepProps {
  serviceId: number;
  employeeId: number;
  timezone: string;
  date: string;
  slot: string;
  onDateChange: (date: string) => void;
  onSlotChange: (slot: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export interface BookingConfirmationProps {
  company?: Company;
  selection: BookingSelection;
  timezone: string;
  onRestart: () => void;
}

export interface OptionCardProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
