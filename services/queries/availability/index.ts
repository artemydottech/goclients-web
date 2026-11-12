'use client';
import { useQuery } from '@tanstack/react-query';
import {
  getAvailability,
  type AvailabilityParams,
} from '@/services/api/availability';
export const useGetAvailability = (
  serviceId: number,
  params: AvailabilityParams,
) =>
  useQuery({
    queryKey: ['get-availability', serviceId, params],
    queryFn: ({ signal }) => getAvailability(serviceId, params, signal),
    enabled: serviceId > 0,
  });
