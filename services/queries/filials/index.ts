'use client';
import { getFilials } from '@/services/api/filials';
import { useQuery } from '@tanstack/react-query';

export const useGetFilials = () =>
  useQuery({
    queryKey: ['get-filials'],
    queryFn: getFilials,
  });
