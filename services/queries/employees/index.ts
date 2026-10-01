'use client';
import { useQuery } from '@tanstack/react-query';
import {
  getEmployee,
  getEmployees,
  getEmployeeServices,
} from '@/services/api/employees';

export const useGetEmployees = (companyId: number) =>
  useQuery({
    queryKey: ['get-employees'],
    queryFn: getEmployees,
    select: (employees) =>
      employees.filter((employee) => employee.company_id === companyId),
  });

export const useGetEmployee = (id: number) =>
  useQuery({
    queryKey: ['get-employee', id],
    queryFn: () => getEmployee(id),
  });

export const useGetEmployeeServices = (id: number) =>
  useQuery({
    queryKey: ['get-employee-services', id],
    queryFn: () => getEmployeeServices(id),
  });
