export interface EmployeeTimeOffProps {
  companyId: number;
  employeeId: number;
}

export interface TimeOffListProps extends EmployeeTimeOffProps {
  timezone: string;
}

export interface CreateTimeOffDialogProps {
  employeeId: number;
  timezone: string;
}
