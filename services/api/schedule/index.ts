import api, { handleApiError } from '..';
import type { WorkingDay } from '@/types';
import type { UpdateEmployeeScheduleRequest } from './schedule.types';

export const getEmployeeSchedule = async (
  employeeId: number,
): Promise<WorkingDay[]> => {
  try {
    const { data } = await api.get<WorkingDay[]>(
      `/employees/${employeeId}/schedule`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить график');
  }
};

export const updateEmployeeSchedule = async ({
  employeeId,
  days,
}: UpdateEmployeeScheduleRequest): Promise<void> => {
  try {
    await api.put(`/employees/${employeeId}/schedule`, { days });
  } catch (error) {
    throw handleApiError(error, 'Не удалось сохранить график');
  }
};
