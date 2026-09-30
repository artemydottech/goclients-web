export interface CreateBookingRequest {
  companyId: number;
  serviceId: number;
  employeeId: number;
  startsAt: string;
  name: string;
  phone: string;
  comment: string;
}

export interface CreateBookingResponse {
  appointmentId: number;
}
