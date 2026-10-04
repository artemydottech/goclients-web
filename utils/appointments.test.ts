import { describe, expect, it } from 'vitest';
import type { Appointment, AppointmentStatus } from '@/types';
import { isActiveAppointment } from './appointments';

const buildAppointment = (
  overrides: Partial<Appointment> = {},
): Appointment => ({
  id: 1,
  company_id: 1,
  client_id: 1,
  employee_id: 1,
  service_id: 1,
  starts_at: '2026-10-05T10:00:00Z',
  ends_at: '2026-10-05T11:00:00Z',
  status: 'pending',
  comment: '',
  price: 1000,
  ...overrides,
});

describe('isActiveAppointment', () => {
  it.each<[AppointmentStatus, boolean]>([
    ['pending', true],
    ['confirmed', true],
    ['cancelled', false],
    ['completed', false],
    ['no_show', false],
  ])('%s -> %s', (status, expected) => {
    expect(isActiveAppointment(buildAppointment({ status }))).toBe(expected);
  });
});
