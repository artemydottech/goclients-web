'use client';
import { useQuery } from '@tanstack/react-query';
import { getEmployeeTimeOff } from '@/services/api/time-off';

export const useGetEmployeeTimeOff = (employeeId: number) =>
  useQuery({
    queryKey: ['get-employee-time-off', employeeId],
    queryFn: () => getEmployeeTimeOff(employeeId),
  });
