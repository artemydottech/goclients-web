'use client';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentHistory } from '@/services/api/appointment-history';
export const useGetAppointmentHistory = (id: number) =>
  useQuery({
    queryKey: ['get-appointment-history', id],
    queryFn: ({ signal }) => getAppointmentHistory(id, signal),
    enabled: id > 0,
  });
