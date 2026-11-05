import api, { handleApiError } from '..';
import type { Appointment, CreatedResponse } from '@/types';
import type {
  CreateAppointmentRequest,
  GetAppointmentsParams,
  UpdateAppointmentStatusRequest,
  UpdateAppointmentTimeRequest,
} from './appointments.types';

export const getAppointments = async (
  params: GetAppointmentsParams = {},
  signal?: AbortSignal,
): Promise<Appointment[]> => {
  try {
    const { data } = await api.get<Appointment[]>('/appointments', {
      signal: signal,
      params,
    });
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить записи');
  }
};

export const getAppointment = async (
  id: number,
  signal?: AbortSignal,
): Promise<Appointment> => {
  try {
    const { data } = await api.get<Appointment>(`/appointments/${id}`, {
      signal: signal,
    });
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить запись');
  }
};

export const createAppointment = async (
  body: CreateAppointmentRequest,
): Promise<CreatedResponse> => {
  try {
    const { data } = await api.post<CreatedResponse>('/appointments', body);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось создать запись');
  }
};

export const deleteAppointment = async (id: number): Promise<void> => {
  try {
    await api.delete(`/appointments/${id}`);
  } catch (error) {
    throw handleApiError(error, 'Не удалось удалить запись');
  }
};

export const updateAppointmentStatus = async ({
  id,
  status,
}: UpdateAppointmentStatusRequest): Promise<void> => {
  try {
    await api.put(`/appointments/${id}/status`, { status });
  } catch (error) {
    throw handleApiError(error, 'Не удалось изменить статус');
  }
};

export const updateAppointmentTime = async ({
  id,
  ...body
}: UpdateAppointmentTimeRequest): Promise<Appointment> => {
  try {
    const { data } = await api.put<Appointment>(
      `/appointments/${id}/time`,
      body,
    );
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось перенести запись');
  }
};

export const searchAppointments=async(
 params:import('./appointments.types').AppointmentSearchParams, signal?:AbortSignal,
):Promise<Appointment[]>=>{
 try {const {data}=await api.get<Appointment[]>('/appointments/search',{params,signal});return data;}
 catch(error){throw handleApiError(error,'Не удалось найти записи');}
};
