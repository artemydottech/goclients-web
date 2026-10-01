'use client';
import { useQueries, useQuery } from '@tanstack/react-query';
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

export const useGetSlotsByDates = (
  params: Omit<GetSlotsParams, 'date'>,
  dates: string[],
) =>
  useQueries({
    queries: dates.map((date) => {
      const dateParams = { ...params, date };
      return {
        queryKey: ['get-slots', dateParams],
        queryFn: () => getSlots(dateParams),
      };
    }),
    combine: (results) =>
      new Map<string, boolean | undefined>(
        dates.map((date, index) => {
          const slots = results[index]?.data;
          return [date, slots && slots.length > 0];
        }),
      ),
  });
