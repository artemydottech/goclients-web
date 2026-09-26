import api, { handleApiError } from '..';
import type { GetSlotsParams } from './slots.types';

export const getSlots = async (params: GetSlotsParams): Promise<string[]> => {
  try {
    const { data } = await api.get<string[]>('/slots', { params });
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить свободное время');
  }
};
