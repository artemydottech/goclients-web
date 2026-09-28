export interface MasterDayProps {
  companyId: number;
  employeeId: number;
  date: Nullable<string>;
}

export interface MasterDayContentProps {
  companyId: number;
  employeeId: number;
  timezone: string;
  from: string;
  to: string;
}
