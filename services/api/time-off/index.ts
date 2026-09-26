import api, { handleApiError } from '..';
import type { CreatedResponse, TimeOff } from '@/types';
import type {
  CreateTimeOffRequest,
  DeleteTimeOffRequest,
} from './time-off.types';

export const getEmployeeTimeOff = async (
  employeeId: number,
): Promise<TimeOff[]> => {
  try {
    const { data } = await api.get<TimeOff[]>(
      `/employees/${employeeId}/time-off`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить отпуска');
  }
};

export const createTimeOff = async ({
  employeeId,
  ...body
}: CreateTimeOffRequest): Promise<CreatedResponse> => {
  try {
    const { data } = await api.post<CreatedResponse>(
      `/employees/${employeeId}/time-off`,
      body,
    );
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось добавить отпуск');
  }
};

export const deleteTimeOff = async ({
  id,
}: DeleteTimeOffRequest): Promise<void> => {
  try {
    await api.delete(`/time-off/${id}`);
  } catch (error) {
    throw handleApiError(error, 'Не удалось удалить отпуск');
  }
};
