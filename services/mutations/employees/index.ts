'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createEmployee,
  updateEmployee,
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
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['get-employees'] }),
        queryClient.invalidateQueries({ queryKey: ['get-service-employees'] }),
        queryClient.invalidateQueries({ queryKey: ['get-appointments'] }),
        queryClient.invalidateQueries({ queryKey: ['get-appointment'] }),
        queryClient.invalidateQueries({ queryKey: ['get-slots'] }),
        queryClient.invalidateQueries({ queryKey: ['get-client-stats'] }),
        queryClient.invalidateQueries({ queryKey: ['get-company-report'] }),
      ]),
  });
};

export const useUpdateEmployeeServices = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployeeServices,
    meta: { successMessage: 'Услуги мастера сохранены', hasInlineError: true },
    onSuccess: (_, { employeeId }) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['get-employee-services', employeeId],
        }),
        queryClient.invalidateQueries({ queryKey: ['get-service-employees'] }),
        queryClient.invalidateQueries({ queryKey: ['get-slots'] }),
      ]),
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployee,
    meta: { successMessage: 'Сотрудник сохранён', hasInlineError: true },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['get-employees'] }),
        queryClient.invalidateQueries({ queryKey: ['get-employee'] }),
        queryClient.invalidateQueries({ queryKey: ['get-service-employees'] }),
      ]),
  });
};
