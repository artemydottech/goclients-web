'use client';
import { getRecords } from '@/services/api/records';
import { useQuery } from '@tanstack/react-query';

export const useGetRecords = () =>
  useQuery({
    queryKey: ['get-records'],
    queryFn: getRecords,
  });
