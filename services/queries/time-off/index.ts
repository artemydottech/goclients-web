'use client';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getEmployeeTimeOff } from '@/services/api/time-off';
import type { TimeOff } from '@/types';

export const useGetEmployeeTimeOff = (employeeId: number) =>
  useQuery({
    queryKey: ['get-employee-time-off', employeeId],
    queryFn: ({ signal }) => getEmployeeTimeOff(employeeId, signal),
  });

export const useGetEmployeesTimeOff = (employeeIds: number[]) =>
  useQueries({
    queries: employeeIds.map((employeeId) => ({
      queryKey: ['get-employee-time-off', employeeId],
      queryFn: ({ signal }) => getEmployeeTimeOff(employeeId, signal),
    })),
    combine: (results) =>
      new Map<number, TimeOff[]>(
        employeeIds.map((employeeId, index) => [
          employeeId,
          results[index]?.data ?? [],
        ]),
      ),
  });
