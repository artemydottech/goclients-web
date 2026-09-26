'use client';
import { useQuery } from '@tanstack/react-query';
import {
  getService,
  getServiceEmployees,
  getServices,
} from '@/services/api/services';

export const useGetServices = (companyId: number) =>
  useQuery({
    queryKey: ['get-services', companyId],
    queryFn: () => getServices(companyId),
  });

export const useGetService = (id: number) =>
  useQuery({
    queryKey: ['get-service', id],
    queryFn: () => getService(id),
  });

export const useGetServiceEmployees = (id: Nullable<number>) =>
  useQuery({
    queryKey: ['get-service-employees', id],
    queryFn: () => getServiceEmployees(Number(id)),
    enabled: id !== null,
  });
