import type { TimeOff } from '@/types';

export interface CreateTimeOffRequest extends Omit<TimeOff, 'id' | 'employee_id'> {
  employeeId: number;
}

export interface DeleteTimeOffRequest {
  id: number;
  employeeId: number;
}
