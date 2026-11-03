'use client';
import { useQuery } from '@tanstack/react-query';
import {
  getEmployee,
  getCompanyEmployees,
  getEmployeeServices,
} from '@/services/api/employees';

export const useGetEmployees = (companyId: number) =>
  useQuery({
    queryKey: ['get-employees', companyId],
    queryFn: ({ signal }) => getCompanyEmployees(companyId, signal),
  });

export const useGetEmployee = (id: number) =>
  useQuery({
    queryKey: ['get-employee', id],
    queryFn: ({ signal }) => getEmployee(id, signal),
  });

export const useGetEmployeeServices = (id: number) =>
  useQuery({
    queryKey: ['get-employee-services', id],
    queryFn: ({ signal }) => getEmployeeServices(id, signal),
  });
