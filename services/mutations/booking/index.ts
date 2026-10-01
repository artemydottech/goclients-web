'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '@/services/api/booking';

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    meta: { hasInlineError: true },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-slots'] });
      queryClient.invalidateQueries({ queryKey: ['get-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['get-clients'] });
    },
  });
};
