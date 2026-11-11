'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createService,
  deleteService,
  updateService,
} from '@/services/api/services';

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
    meta: { successMessage: 'Услуга добавлена', hasInlineError: true },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-services'] }),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    meta: { successMessage: 'Услуга удалена' },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['get-services'] }),
        queryClient.invalidateQueries({ queryKey: ['get-employee-services'] }),
        queryClient.invalidateQueries({ queryKey: ['get-service-employees'] }),
        queryClient.invalidateQueries({ queryKey: ['get-appointments'] }),
        queryClient.invalidateQueries({ queryKey: ['get-appointment'] }),
        queryClient.invalidateQueries({ queryKey: ['get-slots'] }),
 queryClient.invalidateQueries({queryKey:['get-availability']}),
        queryClient.invalidateQueries({ queryKey: ['get-client-stats'] }),
        queryClient.invalidateQueries({ queryKey: ['get-company-report'] }),
      ]),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateService,
    meta: { successMessage: 'Услуга сохранена', hasInlineError: true },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['get-services'] }),
        queryClient.invalidateQueries({ queryKey: ['get-service'] }),
        queryClient.invalidateQueries({ queryKey: ['get-employee-services'] }),
        queryClient.invalidateQueries({ queryKey: ['get-slots'] }),
 queryClient.invalidateQueries({queryKey:['get-availability']}),
      ]),
  });
};
