'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTimeOff, deleteTimeOff } from '@/services/api/time-off';

export const useCreateTimeOff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTimeOff,
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
    onSuccess: (_, { employeeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['get-employee-time-off', employeeId],
      });
      queryClient.invalidateQueries({ queryKey: ['get-slots'] });
    },
  });
};
