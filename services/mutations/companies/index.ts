'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany, deleteCompany } from '@/services/api/companies';

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
      queryClient.invalidateQueries({ queryKey: ['get-companies'] }),
  });
};
