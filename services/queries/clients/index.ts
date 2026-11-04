'use client';
import { useQuery } from '@tanstack/react-query';
import { getClient, getClients, getClientStats, searchClients } from '@/services/api/clients';

export const useGetClients = (companyId: number) =>
  useQuery({
    queryKey: ['get-clients', companyId],
    queryFn: ({ signal }) => getClients(companyId, signal),
  });

export const useGetClient = (id: number) =>
  useQuery({
    queryKey: ['get-client', id],
    queryFn: ({ signal }) => getClient(id, signal),
  });

export const useGetClientStats = (id: number) =>
  useQuery({
    queryKey: ['get-client-stats', id],
    queryFn: ({ signal }) => getClientStats(id, signal),
  });

export const useSearchClients=(companyId:number,query:string)=>useQuery({
 queryKey:['get-clients',companyId,'search',query],
 queryFn:({signal})=>searchClients(companyId,{q:query,limit:50},signal),
});
