'use client';
import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';
import {
  createAppointment,
  updateAppointmentComment,
  deleteAppointment,
  updateAppointmentStatus,
  updateAppointmentTime,
} from '@/services/api/appointments';

const invalidateAppointments = (queryClient: QueryClient) =>
  Promise.all([
    queryClient.invalidateQueries({ queryKey: ['get-appointments'] }),
    queryClient.invalidateQueries({ queryKey: ['get-appointment'] }),
    queryClient.invalidateQueries({ queryKey: ['get-slots'] }),
    queryClient.invalidateQueries({ queryKey: ['get-client-stats'] }),
    queryClient.invalidateQueries({ queryKey: ['get-company-report'] }),
  ]);

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAppointment,
    meta: { successMessage: 'Запись создана', hasInlineError: true },
    onSuccess: () => invalidateAppointments(queryClient),
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAppointment,
    meta: { successMessage: 'Запись удалена' },
    onSuccess: () => invalidateAppointments(queryClient),
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointmentStatus,
    meta: { successMessage: 'Статус обновлён', hasInlineError: true },
    onSuccess: () => invalidateAppointments(queryClient),
  });
};

export const useUpdateAppointmentTime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointmentTime,
    meta: { successMessage: 'Запись перенесена', hasInlineError: true },
    onSuccess: () => invalidateAppointments(queryClient),
  });
};

export const useUpdateAppointmentComment=()=>{
 const queryClient=useQueryClient();return useMutation({mutationFn:updateAppointmentComment,
 meta:{successMessage:'Комментарий сохранён',hasInlineError:true},
 onSuccess:()=>Promise.all([
 queryClient.invalidateQueries({queryKey:['get-appointments']}),
 queryClient.invalidateQueries({queryKey:['get-appointment']}),
 ]),});
};
