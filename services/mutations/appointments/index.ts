'use client';
import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';
import {
  createAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  updateAppointmentTime,
} from '@/services/api/appointments';

const invalidateAppointments = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ['get-appointments'] });
  queryClient.invalidateQueries({ queryKey: ['get-appointment'] });
  queryClient.invalidateQueries({ queryKey: ['get-slots'] });
  queryClient.invalidateQueries({ queryKey: ['get-client-stats'] });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => invalidateAppointments(queryClient),
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => invalidateAppointments(queryClient),
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => invalidateAppointments(queryClient),
  });
};

export const useUpdateAppointmentTime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointmentTime,
    onSuccess: () => invalidateAppointments(queryClient),
  });
};
