import type { WorkingDay } from '@/types';

export type WorkingDayInput = Omit<WorkingDay, 'employee_id'>;

export interface UpdateEmployeeScheduleRequest {
  employeeId: number;
  days: WorkingDayInput[];
}
