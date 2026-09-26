import api, { handleApiError } from '..';
import type { CreatedResponse, Employee, Service } from '@/types';
import type { CreateServiceRequest } from './services.types';

export const getServices = async (companyId: number): Promise<Service[]> => {
  try {
    const { data } = await api.get<Service[]>('/services', {
      params: { company_id: companyId },
    });
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить услуги');
  }
};

export const getService = async (id: number): Promise<Service> => {
  try {
    const { data } = await api.get<Service>(`/services/${id}`);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить услугу');
  }
};

export const createService = async (
  body: CreateServiceRequest,
): Promise<CreatedResponse> => {
  try {
    const { data } = await api.post<CreatedResponse>('/services', body);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось создать услугу');
  }
};

export const deleteService = async (id: number): Promise<void> => {
  try {
    await api.delete(`/services/${id}`);
  } catch (error) {
    throw handleApiError(error, 'Не удалось удалить услугу');
  }
};

export const getServiceEmployees = async (id: number): Promise<Employee[]> => {
  try {
    const { data } = await api.get<Employee[]>(`/services/${id}/employees`);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить мастеров услуги');
  }
};
