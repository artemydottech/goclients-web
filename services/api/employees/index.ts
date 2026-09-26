import api, { handleApiError } from '..';
import type { CreatedResponse, Employee, Service } from '@/types';
import type {
  CreateEmployeeRequest,
  UpdateEmployeeServicesRequest,
} from './employees.types';

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const { data } = await api.get<Employee[]>('/employees');
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить сотрудников');
  }
};

export const getEmployee = async (id: number): Promise<Employee> => {
  try {
    const { data } = await api.get<Employee>(`/employees/${id}`);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить сотрудника');
  }
};

export const createEmployee = async (
  body: CreateEmployeeRequest,
): Promise<CreatedResponse> => {
  try {
    const { data } = await api.post<CreatedResponse>('/employees', body);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось добавить сотрудника');
  }
};

export const deleteEmployee = async (id: number): Promise<void> => {
  try {
    await api.delete(`/employees/${id}`);
  } catch (error) {
    throw handleApiError(error, 'Не удалось удалить сотрудника');
  }
};

export const getEmployeeServices = async (id: number): Promise<Service[]> => {
  try {
    const { data } = await api.get<Service[]>(`/employees/${id}/services`);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить услуги сотрудника');
  }
};

export const updateEmployeeServices = async ({
  employeeId,
  serviceIds,
}: UpdateEmployeeServicesRequest): Promise<void> => {
  try {
    await api.put(`/employees/${employeeId}/services`, {
      service_ids: serviceIds,
    });
  } catch (error) {
    throw handleApiError(error, 'Не удалось сохранить услуги сотрудника');
  }
};
