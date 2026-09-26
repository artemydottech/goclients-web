import type { Employee } from '@/types';

export type CreateEmployeeRequest = Omit<Employee, 'id'>;

export interface UpdateEmployeeServicesRequest {
  employeeId: number;
  serviceIds: number[];
}
