'use client';
import api, { handleApiError } from '..';
import type {
  GetFilialByIdResponse,
  GetFilialsResponse,
} from './filials.types';

export const getFilials = async () => {
  try {
    const response = await api.get<GetFilialsResponse>('/filials');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Ошибка при получении филиалов');
    throw error;
  }
};

export const getFilialById = async (id: string) => {
  try {
    const response = await api.get<GetFilialByIdResponse>(`/filials/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Ошибка при получении филиала');
    throw error;
  }
};
