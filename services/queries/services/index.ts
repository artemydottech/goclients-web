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
    queryFn: ({ signal }) => getServices(companyId, signal),
  });

export const useGetService = (id: number) =>
  useQuery({
    queryKey: ['get-service', id],
    queryFn: ({ signal }) => getService(id, signal),
  });

export const useGetServiceEmployees = (id: Nullable<number>) =>
  useQuery({
    queryKey: ['get-service-employees', id],
    queryFn: ({ signal }) => getServiceEmployees(Number(id), signal),
    enabled: id !== null,
  });
