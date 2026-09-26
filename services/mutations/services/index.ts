'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createService, deleteService } from '@/services/api/services';

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-services'] }),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-services'] });
      queryClient.invalidateQueries({ queryKey: ['get-employee-services'] });
    },
  });
};
