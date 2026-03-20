'use client';
import { getFilialById, getFilials } from '@/services/api/filials';
import { useQuery } from '@tanstack/react-query';

export const useGetFilials = () =>
  useQuery({
    queryKey: ['get-filials'],
    queryFn: getFilials,
  });

export const useGetFilialById = (id: string) =>
  useQuery({
    queryKey: ['get-filial-by-id', id],
    queryFn: () => getFilialById(id),
    enabled: Boolean(id),
  });
