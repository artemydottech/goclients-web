import { createAppointment } from '../appointments';
import { createClient, getClients } from '../clients';
import { onlyDigits } from '@/utils';
import type {
  CreateBookingRequest,
  CreateBookingResponse,
} from './booking.types';

const COMPARABLE_PHONE_DIGITS = 10;

const toComparablePhone = (phone: string): string => {
  const digits = onlyDigits(phone);
  if (digits.length === COMPARABLE_PHONE_DIGITS) return `7${digits}`;
  if (digits.length === COMPARABLE_PHONE_DIGITS + 1 && digits.startsWith('8')) {
    return `7${digits.slice(1)}`;
  }
  return digits;
};

const findOrCreateClientId = async (
  companyId: number,
  name: string,
  phone: string,
): Promise<number> => {
  const clients = await getClients(companyId);
  const existing = clients.find(
    (client) => toComparablePhone(client.phone) === toComparablePhone(phone),
  );
  if (existing) return existing.id;

  const { id } = await createClient({
    company_id: companyId,
    name,
    phone,
    email: '',
    comment: '',
  });
  return id;
};

export const createBooking = async ({
  companyId,
  idempotencyKey,
  serviceId,
  employeeId,
  startsAt,
  name,
  phone,
  comment,
}: CreateBookingRequest): Promise<CreateBookingResponse> => {
  const clientId = await findOrCreateClientId(companyId, name, phone);
  const { id } = await createAppointment({
    client_id: clientId,
    employee_id: employeeId,
    service_id: serviceId,
    starts_at: startsAt,
    comment,
    status: 'pending',
    ...(idempotencyKey?{idempotencyKey}:{}),
  });
  return { appointmentId: id };
};
