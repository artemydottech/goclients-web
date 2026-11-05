'use client';
import { useQuery } from '@tanstack/react-query';
import { getAppointment, getAppointments, searchAppointments } from '@/services/api/appointments';
import type { GetAppointmentsParams } from '@/services/api/appointments/appointments.types';

export const useGetAppointments = (params: GetAppointmentsParams = {}) =>
  useQuery({
    queryKey: ['get-appointments', params],
    queryFn: ({ signal }) => getAppointments(params, signal),
  });

export const useGetAppointment = (id: number) =>
  useQuery({
    queryKey: ['get-appointment', id],
    queryFn: ({ signal }) => getAppointment(id, signal),
  });

export const useGetCompanyAppointments = (
  companyId: number,
  from: string,
  to: string,
) =>
  useQuery({
    queryKey: ['get-appointments', {company_id:companyId,from,to}],
    queryFn: ({signal})=>searchAppointments({company_id:companyId,from,to},signal),
  });
