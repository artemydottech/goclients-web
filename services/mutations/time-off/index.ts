'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTimeOff, deleteTimeOff } from '@/services/api/time-off';

export const useCreateTimeOff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTimeOff,
    meta: { successMessage: 'Период добавлен', hasInlineError: true },
    onSuccess: (_, { employeeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['get-employee-time-off', employeeId],
      });
      queryClient.invalidateQueries({ queryKey: ['get-slots'] });
    },
  });
};

export const useDeleteTimeOff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimeOff,
    meta: { successMessage: 'Период удалён' },
    onSuccess: (_, { employeeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['get-employee-time-off', employeeId],
      });
      queryClient.invalidateQueries({ queryKey: ['get-slots'] });
    },
  });
};
