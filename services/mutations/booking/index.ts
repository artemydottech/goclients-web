'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '@/services/api/booking';

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    meta: { hasInlineError: true },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['get-slots'] }),
        queryClient.invalidateQueries({ queryKey: ['get-availability'] }),
        queryClient.invalidateQueries({ queryKey: ['get-appointments'] }),
        queryClient.invalidateQueries({ queryKey: ['get-clients'] }),
        queryClient.invalidateQueries({ queryKey: ['get-client-stats'] }),
        queryClient.invalidateQueries({ queryKey: ['get-company-report'] }),
      ]),
  });
};
