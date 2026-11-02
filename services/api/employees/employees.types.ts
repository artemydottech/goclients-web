import type { Employee } from '@/types';

export type CreateEmployeeRequest = Omit<Employee, 'id'>;

export interface UpdateEmployeeServicesRequest {
  employeeId: number;
  serviceIds: number[];
}

export interface UpdateEmployeeRequest {
  id: number;
  body: Omit<Employee, 'id' | 'company_id'>;
}
