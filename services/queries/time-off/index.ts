'use client';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getEmployeeTimeOff } from '@/services/api/time-off';
import type { TimeOff } from '@/types';

export const useGetEmployeeTimeOff = (employeeId: number) =>
  useQuery({
    queryKey: ['get-employee-time-off', employeeId],
    queryFn: () => getEmployeeTimeOff(employeeId),
  });

export const useGetEmployeesTimeOff = (employeeIds: number[]) =>
  useQueries({
    queries: employeeIds.map((employeeId) => ({
      queryKey: ['get-employee-time-off', employeeId],
      queryFn: () => getEmployeeTimeOff(employeeId),
    })),
    combine: (results) =>
      new Map<number, TimeOff[]>(
        employeeIds.map((employeeId, index) => [
          employeeId,
          results[index]?.data ?? [],
        ]),
      ),
  });
