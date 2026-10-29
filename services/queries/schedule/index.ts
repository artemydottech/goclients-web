'use client';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getEmployeeSchedule } from '@/services/api/schedule';
import type { WorkingDay } from '@/types';

export const useGetEmployeeSchedule = (employeeId: number) =>
  useQuery({
    queryKey: ['get-employee-schedule', employeeId],
    queryFn: ({ signal }) => getEmployeeSchedule(employeeId, signal),
  });

export const useGetEmployeesSchedules = (employeeIds: number[]) =>
  useQueries({
    queries: employeeIds.map((employeeId) => ({
      queryKey: ['get-employee-schedule', employeeId],
      queryFn: ({ signal }) => getEmployeeSchedule(employeeId, signal),
    })),
    combine: (results) =>
      new Map<number, WorkingDay[] | undefined>(
        employeeIds.map((employeeId, index) => [
          employeeId,
          results[index]?.data,
        ]),
      ),
  });
