'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient, deleteClient } from '@/services/api/clients';

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClient,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-clients'] }),
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-clients'] });
      queryClient.invalidateQueries({ queryKey: ['get-appointments'] });
    },
  });
};
