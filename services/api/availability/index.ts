import api, { handleApiError } from '..';
export interface AvailabilityParams {
  date: string;
  days?: number;
  step?: number;
  limit?: number;
  employee_id?: number;
}
export interface AvailableSlot {
  employee_id: number;
  employee_name: string;
  starts_at: string;
  ends_at: string;
}
export const getAvailability = async (
  serviceId: number,
  params: AvailabilityParams,
  signal?: AbortSignal,
): Promise<AvailableSlot[]> => {
  try {
    const { data } = await api.get<AvailableSlot[]>(
      `/services/${serviceId}/availability`,
      { params, signal },
    );
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось найти свободное время');
  }
};
