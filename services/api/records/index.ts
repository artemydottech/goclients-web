import api, { handleApiError } from '..';
import { GetRecordsRequestResponse } from './records.types';

export const getRecords = async () => {
  try {
    const { data } = await api.get<GetRecordsRequestResponse>('/records');
    return data;
  } catch (error) {
    handleApiError(error, 'Ошибка при получении записей');
    throw error;
  }
};
