import type { AppointmentStatus } from '@/types';

export interface GetAppointmentsParams {
  client_id?: number;
  employee_id?: number;
  from?: string;
  to?: string;
}

export interface CreateAppointmentRequest {
  client_id: number;
  employee_id: number;
  service_id: number;
  starts_at: string;
  comment: string;
  status?: Extract<AppointmentStatus, 'pending' | 'confirmed'>;
}

export interface UpdateAppointmentStatusRequest {
  id: number;
  status: AppointmentStatus;
}

export interface UpdateAppointmentTimeRequest {
  id: number;
  starts_at: string;
  employee_id?: number;
}

export interface AppointmentSearchParams extends GetAppointmentsParams {
  company_id: number;
  service_id?: number;
  status?: AppointmentStatus;
  limit?: number;
  offset?: number;
}
