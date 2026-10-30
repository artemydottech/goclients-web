'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCompany,
  deleteCompany,
  updateCompany,
} from '@/services/api/companies';

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompany,
    meta: { successMessage: 'Компания создана', hasInlineError: true },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-companies'] }),
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompany,
    meta: { successMessage: 'Компания удалена' },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['get-companies'] }),
        queryClient.invalidateQueries({ queryKey: ['get-employees'] }),
        queryClient.invalidateQueries({ queryKey: ['get-services'] }),
        queryClient.invalidateQueries({ queryKey: ['get-clients'] }),
        queryClient.invalidateQueries({ queryKey: ['get-service-employees'] }),
        queryClient.invalidateQueries({ queryKey: ['get-employee-services'] }),
        queryClient.invalidateQueries({ queryKey: ['get-appointments'] }),
        queryClient.invalidateQueries({ queryKey: ['get-appointment'] }),
        queryClient.invalidateQueries({ queryKey: ['get-slots'] }),
        queryClient.invalidateQueries({ queryKey: ['get-client-stats'] }),
      ]),
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompany,
    meta: { successMessage: 'Компания сохранена', hasInlineError: true },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['get-companies'] }),
        queryClient.invalidateQueries({ queryKey: ['get-company'] }),
        queryClient.invalidateQueries({ queryKey: ['get-slots'] }),
      ]),
  });
};
