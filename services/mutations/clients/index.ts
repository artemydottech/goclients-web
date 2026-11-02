'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createClient,
  deleteClient,
  updateClient,
} from '@/services/api/clients';

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClient,
    meta: { successMessage: 'Клиент добавлен', hasInlineError: true },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-clients'] }),
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClient,
    meta: { successMessage: 'Клиент удалён' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-clients'] });
      queryClient.invalidateQueries({ queryKey: ['get-appointments'] });
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClient,
    meta: { successMessage: 'Клиент сохранён', hasInlineError: true },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['get-clients'] }),
        queryClient.invalidateQueries({ queryKey: ['get-client'] }),
      ]),
  });
};
