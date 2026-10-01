'use client';
import { useGetServices } from '@/services/queries/services';
import { useGetEmployees } from '@/services/queries/employees';
import { useGetClients } from '@/services/queries/clients';
import type { Client, Employee, Service } from '@/types';

const byId = <T extends { id: number }>(items: T[] = []): Map<number, T> =>
  new Map(items.map((item) => [item.id, item]));

export interface CompanyDirectory {
  employees: Employee[];
  servicesById: Map<number, Service>;
  employeesById: Map<number, Employee>;
  clientsById: Map<number, Client>;
  isPending: boolean;
  error: Nullable<Error>;
}

export const useCompanyDirectory = (companyId: number): CompanyDirectory => {
  const services = useGetServices(companyId);
  const employees = useGetEmployees(companyId);
  const clients = useGetClients(companyId);

  return {
    employees: employees.data ?? [],
    servicesById: byId(services.data),
    employeesById: byId(employees.data),
    clientsById: byId(clients.data),
    isPending: services.isPending || employees.isPending || clients.isPending,
    error: services.error ?? employees.error ?? clients.error,
  };
};
