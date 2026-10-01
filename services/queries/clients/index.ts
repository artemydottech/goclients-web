'use client';
import { useQuery } from '@tanstack/react-query';
import { getClient, getClients, getClientStats } from '@/services/api/clients';

export const useGetClients = (companyId: number) =>
  useQuery({
    queryKey: ['get-clients', companyId],
    queryFn: () => getClients(companyId),
  });

export const useGetClient = (id: number) =>
  useQuery({
    queryKey: ['get-client', id],
    queryFn: () => getClient(id),
  });

export const useGetClientStats = (id: number) =>
  useQuery({
    queryKey: ['get-client-stats', id],
    queryFn: () => getClientStats(id),
  });
