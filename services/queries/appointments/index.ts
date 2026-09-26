'use client';
import { useQuery } from '@tanstack/react-query';
import { getAppointment, getAppointments } from '@/services/api/appointments';
import type { GetAppointmentsParams } from '@/services/api/appointments/appointments.types';

export const useGetAppointments = (params: GetAppointmentsParams = {}) =>
  useQuery({
    queryKey: ['get-appointments', params],
    queryFn: () => getAppointments(params),
  });

export const useGetAppointment = (id: number) =>
  useQuery({
    queryKey: ['get-appointment', id],
    queryFn: () => getAppointment(id),
  });
