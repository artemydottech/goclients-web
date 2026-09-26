'use client';
import { useQuery } from '@tanstack/react-query';
import { getSlots } from '@/services/api/slots';
import type { GetSlotsParams } from '@/services/api/slots/slots.types';

export const useGetSlots = (params: Nullable<GetSlotsParams>) =>
  useQuery({
    queryKey: ['get-slots', params],
    queryFn: () => {
      if (!params) return [];
      return getSlots(params);
    },
    enabled: params !== null,
  });
