'use client';
import { useQuery } from '@tanstack/react-query';
import { getAppointment, getAppointments } from '@/services/api/appointments';
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
    queryKey: ['get-appointments', {}],
    queryFn: ({ signal }) => getAppointments({}, signal),
    select: (appointments) => {
      const fromMs = Date.parse(from);
      const toMs = Date.parse(to);
      return appointments.filter((appointment) => {
        const startsAtMs = Date.parse(appointment.starts_at);
        return (
          appointment.company_id === companyId &&
          startsAtMs >= fromMs &&
          startsAtMs < toMs
        );
      });
    },
  });
