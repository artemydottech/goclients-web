import api, { handleApiError } from '..';
import type { Client, ClientStats, CreatedResponse } from '@/types';
import type { CreateClientRequest } from './clients.types';

export const getClients = async (companyId: number): Promise<Client[]> => {
  try {
    const { data } = await api.get<Client[]>('/clients', {
      params: { company_id: companyId },
    });
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить клиентов');
  }
};

export const getClient = async (id: number): Promise<Client> => {
  try {
    const { data } = await api.get<Client>(`/clients/${id}`);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить клиента');
  }
};

export const getClientStats = async (id: number): Promise<ClientStats> => {
  try {
    const { data } = await api.get<ClientStats>(`/clients/${id}/stats`);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить статистику клиента');
  }
};

export const createClient = async (
  body: CreateClientRequest,
): Promise<CreatedResponse> => {
  try {
    const { data } = await api.post<CreatedResponse>('/clients', body);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось добавить клиента');
  }
};

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await api.delete(`/clients/${id}`);
  } catch (error) {
    throw handleApiError(error, 'Не удалось удалить клиента');
  }
};
