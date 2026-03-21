import api, { handleApiError } from '..';
import { GetRecordsRequestResponse } from './records.types';

export const getRecords = async () => {
  try {
    const response = await api.get<GetRecordsRequestResponse>('/filials');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Ошибка при получении записей');
    throw error;
  }
};
