'use client';
import { useQuery } from '@tanstack/react-query';
import { getEmployeeSchedule } from '@/services/api/schedule';

export const useGetEmployeeSchedule = (employeeId: number) =>
  useQuery({
    queryKey: ['get-employee-schedule', employeeId],
    queryFn: () => getEmployeeSchedule(employeeId),
  });
