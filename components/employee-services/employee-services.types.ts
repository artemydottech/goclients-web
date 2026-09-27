import type { Service } from '@/types';

export interface EmployeeServicesProps {
  companyId: number;
  employeeId: number;
}

export interface EmployeeServicesFormProps {
  employeeId: number;
  services: Service[];
  initialServiceIds: number[];
}
