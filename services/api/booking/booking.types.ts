export interface CreateBookingRequest {
 idempotencyKey?:string;
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
