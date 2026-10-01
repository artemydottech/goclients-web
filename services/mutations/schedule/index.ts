'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmployeeSchedule } from '@/services/api/schedule';

export const useUpdateEmployeeSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployeeSchedule,
    meta: { successMessage: 'График сохранён', hasInlineError: true },
    onSuccess: (_, { employeeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['get-employee-schedule', employeeId],
      });
      queryClient.invalidateQueries({ queryKey: ['get-slots'] });
    },
  });
};
