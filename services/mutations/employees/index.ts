'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createEmployee,
  deleteEmployee,
  updateEmployeeServices,
} from '@/services/api/employees';

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    meta: { successMessage: 'Сотрудник добавлен', hasInlineError: true },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-employees'] }),
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployee,
    meta: { successMessage: 'Сотрудник удалён' },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-employees'] });
      queryClient.invalidateQueries({ queryKey: ['get-service-employees'] });
    },
  });
};

export const useUpdateEmployeeServices = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployeeServices,
    meta: { successMessage: 'Услуги мастера сохранены', hasInlineError: true },
    onSuccess: (_, { employeeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['get-employee-services', employeeId],
      });
      queryClient.invalidateQueries({ queryKey: ['get-service-employees'] });
    },
  });
};
