import api, { handleApiError } from '..';
import type { Appointment } from '@/types';
export interface AppointmentEvent {
  id: number;
  appointment_id: number;
  kind: 'created' | 'status' | 'rescheduled' | 'comment';
  occurred_at: string;
  before: Appointment | null;
  after: Appointment;
}
export const getAppointmentHistory = async (
  id: number,
  signal?: AbortSignal,
): Promise<AppointmentEvent[]> => {
  try {
    const { data } = await api.get<AppointmentEvent[]>(
      `/appointments/${id}/history`,
      { params: { limit: 50 }, signal },
    );
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить историю записи');
  }
};
