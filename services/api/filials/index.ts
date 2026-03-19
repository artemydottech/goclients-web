'use client';
import api, { handleApiError } from '..';
import type { GetFilialsResponse } from './filials.types';

export const getFilials = async () => {
  try {
    const response = await api.get<GetFilialsResponse>('/filials');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Ошибка при получении филиалов');
    throw error;
  }
};
